import { useEffect, useState } from "react";
import { SocialMetrics } from "@/types/social";
import { MetricsAnalyzer } from "@/lib/social/metrics-analyzer";
import { Activity, Users, TrendingUp, Share2 } from "lucide-react";

interface MetricsOverviewProps {
  platformManager: any;
  metricsAnalyzer: MetricsAnalyzer;
}

export const MetricsOverview = ({
  platformManager,
  metricsAnalyzer,
}: MetricsOverviewProps) => {
  const [metrics, setMetrics] = useState<SocialMetrics[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const platforms = await platformManager.getAllPlatformStatuses();
        const allMetrics = await Promise.all(
          platforms.map(async (platform) => {
            const interactions = await platformManager.getRecentInteractions(
              100
            );
            const viralContent = await platformManager.getViralContent(50);
            return metricsAnalyzer.calculateMetrics(
              platform.id,
              interactions,
              viralContent,
              "daily"
            );
          })
        );
        setMetrics(allMetrics);
      } catch (error) {
        console.error("Failed to load metrics:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMetrics();
    const interval = setInterval(loadMetrics, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, [platformManager, metricsAnalyzer]);

  if (loading) {
    return <div>Loading metrics...</div>;
  }

  const aggregateMetrics = metrics.reduce(
    (acc, m) => ({
      engagement: acc.engagement + m.engagement,
      reach: acc.reach + m.reach,
      viralScore: Math.max(acc.viralScore, m.viralScore),
      activeChains: acc.activeChains + m.activeChains,
    }),
    { engagement: 0, reach: 0, viralScore: 0, activeChains: 0 }
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <MetricCard
        title="Engagement Rate"
        value={`${(aggregateMetrics.engagement / metrics.length).toFixed(1)}%`}
        icon={<Activity className="h-6 w-6" />}
        change={5.2}
      />
      <MetricCard
        title="Total Reach"
        value={aggregateMetrics.reach.toLocaleString()}
        icon={<Users className="h-6 w-6" />}
        change={12.5}
      />
      <MetricCard
        title="Viral Score"
        value={aggregateMetrics.viralScore.toFixed(1)}
        icon={<TrendingUp className="h-6 w-6" />}
        change={1.2}
      />
      <MetricCard
        title="Active Chains"
        value={aggregateMetrics.activeChains}
        icon={<Share2 className="h-6 w-6" />}
      />
    </div>
  );
};
