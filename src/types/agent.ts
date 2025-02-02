import { CdpAgentkit } from "@coinbase/cdp-agentkit-core";

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
