// src/app/providers.tsx
import { DeFiAgent } from "@/lib/defi";
import { useEffect, useState } from "react";

export function DeFiProvider({ children }: { children: React.ReactNode }) {
  const [defiAgent, setDefiAgent] = useState<DeFiAgent | null>(null);

  useEffect(() => {
    const initializeAgent = async () => {
      const agent = new DeFiAgent({
        litNodeEndpoint: process.env.NEXT_PUBLIC_LIT_NODE_ENDPOINT!,
        provider: new ethers.providers.JsonRpcProvider(
          process.env.NEXT_PUBLIC_RPC_URL
        ),
        agentConfig: {
          // Your AgentKit config
        },
      });

      await agent.initialize();
      setDefiAgent(agent);
    };

    initializeAgent();
  }, []);

  if (!defiAgent) {
    return <div>Initializing DeFi agent...</div>;
  }

  return <>{children}</>;
}
