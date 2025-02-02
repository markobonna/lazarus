// src/lib/defi/index.ts

import { ethers } from "ethers";
import { LitNodeClient } from "@lit-protocol/lit-node-client";
import { AgentConfig } from "@coinbase/agentkit";
import { DeFiStrategyExecutor } from "./strategy-executor";
import { DeFiAnalytics } from "./analytics";

export interface DeFiAgentConfig {
  litNodeEndpoint: string;
  provider: ethers.providers.Provider;
  agentConfig: AgentConfig;
}

/**
 * Main DeFi Agent class that coordinates strategy execution and analytics
 */
export class DeFiAgent {
  private executor: DeFiStrategyExecutor;
  private analytics: DeFiAnalytics;
  private litClient: LitNodeClient;
  private initialized: boolean = false;

  constructor(config: DeFiAgentConfig) {
    this.litClient = new LitNodeClient({
      alertWhenUnauthorized: false,
      debug: false,
      litNodeEndpoint: config.litNodeEndpoint,
    });

    this.executor = new DeFiStrategyExecutor(
      this.litClient,
      config.agentConfig,
      config.provider
    );

    this.analytics = new DeFiAnalytics();
  }

  /**
   * Initialize the DeFi agent and its dependencies
   */
  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

    try {
      await this.litClient.connect();
      this.initialized = true;
    } catch (error) {
      console.error("Failed to initialize DeFi agent:", error);
      throw new Error("DeFi agent initialization failed");
    }
  }

  /**
   * Get the strategy executor instance
   */
  getExecutor(): DeFiStrategyExecutor {
    this.ensureInitialized();
    return this.executor;
  }

  /**
   * Get the analytics instance
   */
  getAnalytics(): DeFiAnalytics {
    this.ensureInitialized();
    return this.analytics;
  }

  /**
   * Check if the agent has been initialized
   */
  isInitialized(): boolean {
    return this.initialized;
  }

  /**
   * Get the connected Lit Protocol client
   */
  getLitClient(): LitNodeClient {
    this.ensureInitialized();
    return this.litClient;
  }

  private ensureInitialized(): void {
    if (!this.initialized) {
      throw new Error("DeFi agent not initialized. Call initialize() first.");
    }
  }
}

// Re-export types and utilities
export * from "../../types/defi";
export { DeFiStrategyExecutor } from "./strategy-executor";
export { DeFiAnalytics } from "./analytics";

// Export common constants
export const SUPPORTED_CHAINS = [
  1, // Ethereum Mainnet
  137, // Polygon
  42161, // Arbitrum
  10, // Optimism
];

export const STRATEGY_TYPES = {
  YIELD_FARMING: "yield-farming",
  DEX_ARBITRAGE: "dex-arbitrage",
  LENDING: "lending",
} as const;

// Example usage of the DeFi agent:
/*
import { DeFiAgent } from '@/lib/defi';

const defiAgent = new DeFiAgent({
  litNodeEndpoint: process.env.NEXT_PUBLIC_LIT_NODE_ENDPOINT!,
  provider: new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL),
  agentConfig: {
    // Your AgentKit configuration
  }
});

// Initialize the agent
await defiAgent.initialize();

// Get instances for use in components
const executor = defiAgent.getExecutor();
const analytics = defiAgent.getAnalytics();

// Execute a strategy
const strategy = {
  id: STRATEGY_TYPES.YIELD_FARMING,
  name: 'Basic Yield Farming',
  risk: 'medium',
  parameters: {
    minYield: 5,
    rebalanceThreshold: 2
  },
  chains: SUPPORTED_CHAINS
};

const success = await executor.executeStrategy(strategy);
*/
