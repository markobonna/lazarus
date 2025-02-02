import { ChainConfig } from "@/types/multi-chain";
import { Activity } from "lucide-react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ChainCardProps {
  chain: ChainConfig;
  isSelected: boolean;
  metrics?: {
    successRate?: number;
    avgTime?: number;
  };
  onSelect: () => void;
}

export const ChainCard = ({
  chain,
  isSelected,
  metrics,
  onSelect,
}: ChainCardProps) => {
  return (
    <Card
      className={`cursor-pointer hover:shadow-lg transition-shadow ${
        isSelected ? "border-blue-500 ring-2 ring-blue-500/50" : ""
      }`}
      onClick={onSelect}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {chain.icon && (
              <div className="relative w-6 h-6">
                <Image
                  src={chain.icon}
                  alt={`${chain.name} icon`}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            )}
            <span>{chain.name}</span>
          </div>
          <Activity
            className={`h-5 w-5 ${
              isSelected ? "text-green-500" : "text-gray-400"
            }`}
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            Native Token: {chain.nativeToken}
          </p>
          {metrics && (
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span>Success Rate:</span>
              <span className="text-right">{metrics.successRate ?? 0}%</span>
              <span>Avg Time:</span>
              <span className="text-right">{metrics.avgTime ?? 0}s</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
