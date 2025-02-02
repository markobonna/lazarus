// src/lib/multi-chain/chain-metrics.ts

import {
  ChainMetrics,
  Transaction,
  GasUsage,
  PerformanceMetrics,
} from "@/types/multi-chain";
import { chainConfigs, ERROR_MESSAGES } from "@/config/multi-chain";
import { ethers } from "ethers";

export class ChainMetricsManager {
  private providers: Record<string, ethers.providers.Provider> = {};

  constructor() {
    // Initialize providers for each chain
    Object.entries(chainConfigs).forEach(([chainId, config]) => {
      this.providers[chainId] = new ethers.providers.JsonRpcProvider(
        config.rpcUrl
      );
    });
  }

  async fetchMetrics(chainId: string): Promise<ChainMetrics> {
    try {
      const provider = this.providers[chainId];
      if (!provider) {
        throw new Error(ERROR_MESSAGES.INVALID_CHAIN);
      }

      const [transactions, gasUsage, performance] = await Promise.all([
        this.fetchTransactions(chainId),
        this.fetchGasUsage(chainId),
        this.fetchPerformanceMetrics(chainId),
      ]);

      return {
        transactions,
        gasUsage,
        performance,
      };
    } catch (error) {
      console.error("Error fetching chain metrics:", error);
      throw error;
    }
  }

  private async fetchTransactions(chainId: string): Promise<Transaction[]> {
    try {
      const provider = this.providers[chainId];
      const blockNumber = await provider.getBlockNumber();
      const block = await provider.getBlock(blockNumber);

      const transactions: Transaction[] = [];

      for (let i = 0; i < Math.min(10, block.transactions.length); i++) {
        const txHash = block.transactions[i];
        const tx = await provider.getTransaction(txHash);
        const receipt = await provider.getTransactionReceipt(txHash);

        transactions.push({
          id: txHash,
          hash: txHash,
          type: this.determineTransactionType(tx),
          status: receipt.status ? "success" : "failed",
          timestamp: block.timestamp * 1000,
          from: tx.from,
          to: tx.to || "",
          value: ethers.utils.formatEther(tx.value),
          gasUsed: receipt.gasUsed.toString(),
        });
      }

      return transactions;
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return [];
    }
  }

  private async fetchGasUsage(chainId: string): Promise<GasUsage> {
    try {
      const provider = this.providers[chainId];
      const gasPrice = await provider.getGasPrice();

      return {
        daily: parseFloat(ethers.utils.formatUnits(gasPrice, "gwei")),
        weekly: 0, // Would need historical data
        monthly: 0, // Would need historical data
        average: parseFloat(ethers.utils.formatUnits(gasPrice, "gwei")),
      };
    } catch (error) {
      console.error("Error fetching gas usage:", error);
      return {
        daily: 0,
        weekly: 0,
        monthly: 0,
        average: 0,
      };
    }
  }

  private async fetchPerformanceMetrics(
    chainId: string
  ): Promise<PerformanceMetrics> {
    try {
      const provider = this.providers[chainId];
      const blockNumber = await provider.getBlockNumber();
      const block = await provider.getBlock(blockNumber);

      // In a real implementation, you would calculate these based on historical data
      return {
        avgConfirmationTime: 15, // seconds
        successRate: 98,
        failureRate: 2,
        totalTransactions: block.transactions.length,
      };
    } catch (error) {
      console.error("Error fetching performance metrics:", error);
      return {
        avgConfirmationTime: 0,
        successRate: 0,
        failureRate: 0,
        totalTransactions: 0,
      };
    }
  }

  private determineTransactionType(
    tx: ethers.providers.TransactionResponse
  ): Transaction["type"] {
    if (!tx.to) return "contract";
    if (tx.data && tx.data !== "0x") return "contract";
    return "transfer";
  }
}
