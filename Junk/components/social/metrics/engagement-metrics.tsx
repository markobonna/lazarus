import { useEffect, useState } from "react";
import { MetricCard } from "./metric-card";
import { Activity, MessageCircle } from "lucide-react";

export const EngagementMetrics = () => {
  const [metrics, setMetrics] = useState({
    dailyEngagement: 0,
    totalInteractions: 0,
    responseRate: 0,
  });

  useEffect(() => {
    // Fetch engagement metrics implementation
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <MetricCard
        title="Daily Engagement"
        value={`${metrics.dailyEngagement}%`}
        icon={<Activity className="h-6 w-6" />}
      />
      <MetricCard
        title="Total Interactions"
        value={metrics.totalInteractions}
        icon={<MessageCircle className="h-6 w-6" />}
      />
      <MetricCard
        title="Response Rate"
        value={`${metrics.responseRate}%`}
        icon={<Activity className="h-6 w-6" />}
      />
    </div>
  );
};
