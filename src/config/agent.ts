import { CdpAgentkit } from "@coinbase/cdp-agentkit-core";
import { supportedChains } from "./chains";

// We'll create an async function to configure the agent
export async function configureAgent() {
  // Initialize CDP AgentKit
  const agentkit = await CdpAgentkit.configureWithWallet();

  return {
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
}
