// src/types/defi.ts

import { ethers } from "ethers";

export interface DeFiStrategy {
  id: string;
  name: string;
  risk: "low" | "medium" | "high";
  parameters: Record<string, any>;
  chains: number[];
}

export interface TradeExecution {
  protocolId: string;
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
  minAmountOut: string;
  deadline: number;
}

export interface TradeMetrics {
  timestamp: number;
  strategy: string;
  entryPrice: number;
  exitPrice: number;
  profitLoss: number;
  gasUsed: number;
  executionTime: number;
  success: boolean;
}

export interface PerformanceMetrics {
  totalValue: number;
  profitLoss: number;
  successRate: number;
  gasSpent: number;
  executionCount: number;
  avgExecutionTime: number;
  riskMetrics: RiskMetrics;
}

export interface RiskMetrics {
  sharpeRatio: number;
  maxDrawdown: number;
  volatility: number;
  successRatio: number;
}

export interface DeFiAgentState {
  status: "idle" | "executing" | "error";
  currentStrategy: string | null;
  wallet: string | null;
  performance: {
    totalValue: number;
    dailyChange: number;
    successRate: number;
  };
  recentTrades: {
    type: string;
    timestamp: string;
    amount: string;
    success: boolean;
  }[];
}
