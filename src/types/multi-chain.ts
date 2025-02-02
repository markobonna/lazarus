// src/types/multi-chain.ts

export interface ChainConfig {
  name: string;
  nativeToken: string;
  bridgeAddress: string;
  rpcUrl: string;
  icon?: string;
}

export interface ChainMetrics {
  transactions: Transaction[];
  gasUsage: GasUsage;
  performance: PerformanceMetrics;
}

export interface Transaction {
  id: string;
  hash: string;
  type: "transfer" | "bridge" | "contract";
  status: "success" | "pending" | "failed";
  timestamp: number;
  from: string;
  to: string;
  value: string;
  gasUsed?: string;
}

export interface GasUsage {
  daily: number;
  weekly: number;
  monthly: number;
  average: number;
}

export interface PerformanceMetrics {
  avgConfirmationTime: number;
  successRate: number;
  failureRate: number;
  totalTransactions: number;
}

export interface BridgeStatus {
  operational: boolean;
  lastSync: number;
  pendingTransactions: number;
  avgProcessingTime: number;
  totalLocked?: string;
  recentEvents?: BridgeEvent[];
}

export interface BridgeEvent {
  id: string;
  type: "deposit" | "withdrawal" | "error";
  timestamp: number;
  amount: string;
  token: string;
  status: "completed" | "pending" | "failed";
}

export interface NetworkSettings {
  rpcUrl: string;
  bridgeAddress: string;
  enabled: boolean;
  customGasPrice?: string;
  maxGasLimit?: string;
}

export interface ChainState {
  selectedChain: string | null;
  metrics: Record<string, ChainMetrics>;
  bridgeStatus: Record<string, BridgeStatus>;
  settings: Record<string, NetworkSettings>;
}
