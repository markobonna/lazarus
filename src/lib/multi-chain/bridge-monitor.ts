// src/lib/multi-chain/bridge-monitor.ts

import { BridgeStatus, BridgeEvent } from '@/types/multi-chain';
import { chainConfigs, ERROR_MESSAGES } from '@/config/multi-chain';
import { ethers } from 'ethers';

// Basic Bridge ABI for monitoring
const BRIDGE_ABI = [
  'event Deposit(address indexed sender, uint256 amount, uint256 timestamp)',
  'event Withdrawal(address indexed recipient, uint256 amount, uint256 timestamp)',
  'function getTotalLocked() view returns (uint256)',
  'function getPendingTransactions() view returns (uint256)'
];

export class BridgeMonitor {
  private providers: Record<string, ethers.providers.Provider> = {};
  private bridges: Record<string, ethers.Contract> = {};

  constructor() {
    // Initialize providers and bridge contracts for each chain
    Object.entries(chainConfigs).forEach(([chainId, config]) => {
      const provider = new ethers.providers.JsonRpcProvider(config.rpcUrl);
      this.providers[chainId] = provider;
      this.bridges[chainId] = new ethers.Contract(
        config.bridgeAddress,
        BRIDGE_ABI,
        provider
      );
    });
  }

  async getStatus(chainId: string): Promise<BridgeStatus> {
    try {
      const bridge = this.bridges[chainId];
      if (!bridge) {
        throw new Error(ERROR_MESSAGES.INVALID_CHAIN);
      }

      const [
        totalLocked,
        pendingTransactions,
        recentEvents
      ] = await Promise.all([
        this.getTotalLocked(chainId),
        this.getPendingTransactions(chainId),
        this.getRecentEvents(chainId)
      ]);

      return {
        operational: true,
        lastSync: Date.now(),
        pendingTransactions,
        avgProcessingTime: this.calculateAvgProcessingTime(recentEvents),
        totalLocked,
        recentEvents
      };
    } catch (error) {
      console.error('Error fetching bridge status:', error);
      return {
        operational: false,
        lastSync: Date.now(),
        pendingTransactions: 0,
        avgProcessingTime: 0,
        totalLocked: '0',
        recentEvents: []
      };
    }
  }

  private async getTotalLocked(chainId: string): Promise<string> {
    try {
      const bridge = this.bridges[chainId];
      const totalLocked = await bridge.getTotalLocked();
      return ethers.utils.formatEther(totalLocked);
    } catch (error) {
      console.error('Error fetching total locked:', error);
      return '0';
    }
  }

  private async getPendingTransactions(chainId: string): Promise<number> {
    try {
      const bridge = this.bridges[chainId];
      const pending = await bridge.getPendingTransactions();
      return pending.toNumber();
    } catch (error) {
      console.error('Error fetching pending transactions:', error);
      return 0;
    }
  }

  private async getRecentEvents(chainId: string): Promise<BridgeEvent[]> {
    try {
      const bridge = this.bridges[chainId];
      const provider = this.providers[chainId];
      const currentBlock = await provider.getBlockNumber();
      const fromBlock = currentBlock - 1000; // Last 1000 blocks

      const [deposits, withdrawals] = await Promise.all([
        bridge.queryFilter(bridge.filters.Deposit(), fromBlock),
        bridge.queryFilter(bridge.filters.Withdrawal(), fromBlock)
      ]);

      const events: BridgeEvent[] = [
        ...deposits.map(event => ({
          id: event.transactionHash,
          type: 'deposit' as const,
          timestamp: event.args!.timestamp.toNumber() * 1000,
          amount: ethers.utils.formatEther(event.args!.amount),
          token: chainConfigs[chainId].nativeToken,
          status: 'completed' as const
        })),
        ...withdrawals.map(event => ({
          id: event.transactionHash,
          type: 'withdrawal' as const,
          timestamp: event.args!.timestamp.toNumber() * 1000,
          amount: ethers.utils.formatEther(event.args!.amount),
          token: chainConfigs[chainId].nativeToken,
          status: 'completed' as const
        }))
      ];

      return events.sort((a, b) => b.timestamp - a.timestamp);
    } catch (error) {
      console.error('Error fetching bridge events:', error);
      return [];
    }
  }

  private calculateAvgProcessingTime(events: BridgeEvent[]): number {
    if (events.length === 0) return 0;
    
    const completedEvents = events.filter(event => event.status === 'completed');
    if (completedEvents.length === 0) return 0;

    const totalTime = completedEvents.reduce((sum, event) => {
      const now = Date.now();
      return sum + (now - event.timestamp);
    }, 0);

    return Math.round(totalTime / completedEvents.length / 1000); // Convert to seconds