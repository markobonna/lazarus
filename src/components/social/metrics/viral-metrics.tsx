import { useEffect, useState } from "react";
import { MetricCard } from "./metric-card";
import { TrendingUp, Share2, Star } from "lucide-react";

export const ViralMetrics = () => {
  const [metrics, setMetrics] = useState({
    viralScore: 0,
    totalShares: 0,
    viralContent: 0,
  });

  useEffect(() => {
    // Fetch viral metrics implementation
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <MetricCard
        title="Viral Score"
        value={metrics.viralScore.toFixed(1)}
        icon={<TrendingUp className="h-6 w-6" />}
      />
      <MetricCard
        title="Total Shares"
        value={metrics.totalShares}
        icon={<Share2 className="h-6 w-6" />}
      />
      <MetricCard
        title="Viral Content"
        value={metrics.viralContent}
        icon={<Star className="h-6 w-6" />}
      />
    </div>
  );
};
