// src/config/multi-chain.ts

import { ChainConfig, NetworkSettings } from "@/types/multi-chain";

export const chainConfigs: Record<string, ChainConfig> = {
  flow: {
    name: "Flow",
    nativeToken: "FLOW",
    bridgeAddress: process.env.NEXT_PUBLIC_FLOW_BRIDGE_ADDRESS!,
    rpcUrl: process.env.NEXT_PUBLIC_FLOW_RPC_URL!,
    icon: "/images/flow-logo.svg",
  },
  base: {
    name: "Base",
    nativeToken: "ETH",
    bridgeAddress: process.env.NEXT_PUBLIC_BASE_BRIDGE_ADDRESS!,
    rpcUrl: process.env.NEXT_PUBLIC_BASE_RPC_URL!,
    icon: "/images/base-logo.svg",
  },
  arbitrum: {
    name: "Arbitrum",
    nativeToken: "ETH",
    bridgeAddress: process.env.NEXT_PUBLIC_ARBITRUM_BRIDGE_ADDRESS!,
    rpcUrl: process.env.NEXT_PUBLIC_ARBITRUM_RPC_URL!,
    icon: "/images/arbitrum-logo.svg",
  },
};

export const defaultNetworkSettings: NetworkSettings = {
  enabled: true,
  customGasPrice: undefined,
  maxGasLimit: "2000000",
  rpcUrl: "",
  bridgeAddress: "",
};

export const REFRESH_INTERVAL = 30000; // 30 seconds
export const MAX_TRANSACTIONS_DISPLAY = 50;
export const GAS_PRICE_UPDATE_INTERVAL = 10000; // 10 seconds

export const ERROR_MESSAGES = {
  RPC_ERROR: "Failed to connect to network RPC",
  BRIDGE_ERROR: "Bridge service is currently unavailable",
  TRANSACTION_ERROR: "Failed to fetch transaction data",
  INVALID_CHAIN: "Invalid chain selected",
};
