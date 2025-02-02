import { ChainConfig, ChainMetrics } from "@/types/multi-chain";
import { ChainCard } from "./chain-card";

interface ChainOverviewProps {
  chains: Record<string, ChainConfig>;
  selectedChain: string | null;
  metrics: Record<string, ChainMetrics>;
  onChainSelect: (chainId: string) => void;
}

export const ChainOverview = ({
  chains,
  selectedChain,
  metrics,
  onChainSelect,
}: ChainOverviewProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Object.entries(chains).map(([chainId, chain]) => (
        <ChainCard
          key={chainId}
          chain={chain}
          isSelected={selectedChain === chainId}
          metrics={{
            successRate: metrics[chainId]?.performance.successRate,
            avgTime: metrics[chainId]?.performance.avgConfirmationTime,
          }}
          onSelect={() => onChainSelect(chainId)}
        />
      ))}
    </div>
  );
};
