import { CdpAgentkit } from "@coinbase/cdp-agentkit-core";
import { supportedChains } from "./chains";
import { ethers } from "ethers";
import { AVSClient } from "../avs/client";
import { defaultAVSConfig } from "../avs/config";
import { VerificationMiddleware } from "../avs/verificationMiddleware";
import { AgentConfig } from "../types/agent";

export async function configureAgent(): Promise<{
  config: AgentConfig;
  avsClient: AVSClient;
  verificationMiddleware: VerificationMiddleware;
}> {
  // Initialize CDP AgentKit
  const agentkit = await CdpAgentkit.configureWithWallet();

  // Setup provider and signer for AVS
  const provider = new ethers.providers.JsonRpcProvider(
    process.env.NETWORK_ID === "base-sepolia"
      ? "https://sepolia.base.org"
      : "https://mainnet.base.org"
  );

  const wallet = new ethers.Wallet(
    process.env.CDP_API_KEY_PRIVATE_KEY || "",
    provider
  );

  // Initialize AVS client
  const avsClient = new AVSClient(defaultAVSConfig, provider, wallet);

  // Initialize verification middleware
  const verificationMiddleware = new VerificationMiddleware(avsClient);

  const config: AgentConfig = {
    name: "AMER",
    description: "AI-Managed Ethereum Rollups Agent",
    chainIds: supportedChains.map((chain) => chain.id),
    agentkit,
    parameters: {
      maxGasLimit: BigInt(1000000),
      maxFeePerGas: BigInt(100000000000),
      defaultTimeoutMs: 30000,
    },
  };

  return {
    config,
    avsClient,
    verificationMiddleware,
  };
}

// Helper function to create a new agent instance
export async function createAgentInstance(
  config: AgentConfig,
  instanceId: string
): Promise<AgentInstance> {
  return {
    instanceId,
    name: config.name,
    description: config.description,
    status: "stopped",
    templateId: "base-template",
    parameters: config.parameters,
    agentkit: config.agentkit,
  };
}
