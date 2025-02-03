import { useEffect, useState } from "react";
import { SocialMetrics } from "@/types/social";
import { MetricCard } from "../metrics/metric-card";
import { Activity, Users, TrendingUp, Share2 } from "lucide-react";

export const MetricsOverview = () => {
  const [metrics, setMetrics] = useState<SocialMetrics>({
    engagement: 0,
    reach: 0,
    viralScore: 0,
    activeChains: 0,
  });

  useEffect(() => {
    // Fetch metrics implementation
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <MetricCard
        title="Engagement Rate"
        value={`${metrics.engagement}%`}
        icon={<Activity className="h-6 w-6" />}
        change={5.2}
      />
      <MetricCard
        title="Total Reach"
        value={metrics.reach.toLocaleString()}
        icon={<Users className="h-6 w-6" />}
        change={12.5}
      />
      <MetricCard
        title="Viral Score"
        value={metrics.viralScore.toFixed(1)}
        icon={<TrendingUp className="h-6 w-6" />}
        change={1.2}
      />
      <MetricCard
        title="Active Chains"
        value={metrics.activeChains}
        icon={<Share2 className="h-6 w-6" />}
      />
    </div>
  );
};
