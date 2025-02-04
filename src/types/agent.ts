import { CdpAgentkit } from "@coinbase/cdp-agentkit-core";
import { AgentKit, CdpWalletProvider } from "@coinbase/agentkit";
import * as dotenv from "dotenv";

dotenv.config();

export interface AgentTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  capabilities: string[];
  requiredActions: string[];
  defaultConfig: Record<string, any>;
}

export interface AgentParameters {
  maxGasLimit: bigint;
  maxFeePerGas: bigint;
  defaultTimeoutMs: number;
}

export interface AgentInstance {
  instanceId: string;
  name: string;
  description: string;
  status: "running" | "paused" | "stopped";
  templateId: string;
  parameters: AgentParameters;
  agentkit: CdpAgentkit;
}

export interface AgentConfig {
  name: string;
  description: string;
  chainIds: number[];
  agentkit: CdpAgentkit;
  parameters: AgentParameters;
}

export interface WalletDetails {
  address: string;
  balance: bigint;
  network: string;
}

async function initializeAgent() {
  const config = {
    apiKeyName: process.env.CDP_API_KEY_NAME,
    apiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY,
    networkId: process.env.NETWORK_ID || "base-sepolia",
  };

  const walletProvider = await CdpWalletProvider.configureWithWallet(config);
  const agentkit = await AgentKit.from({ walletProvider });
  // Additional setup...
}
