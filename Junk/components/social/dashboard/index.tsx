import { MetricsOverview } from "./metrics-overview";
import { SocialStats } from "../metrics/social-stats";
import { ViralContentList } from "../viral-metrics/viral-content-list";
import { InteractionFeed } from "./interaction-feed";

interface SocialDashboardProps {
  platformManager: any;
  metricsAnalyzer: any;
}

export const SocialDashboard = ({
  platformManager,
  metricsAnalyzer,
}: SocialDashboardProps) => {
  return (
    <div className="space-y-6">
      {/* Metrics Overview */}
      <MetricsOverview
        platformManager={platformManager}
        metricsAnalyzer={metricsAnalyzer}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Charts */}
        <div className="space-y-6">
          <SocialStats
            platformManager={platformManager}
            metricsAnalyzer={metricsAnalyzer}
          />
          <ViralContentList platformManager={platformManager} />
        </div>

        {/* Interaction Feed */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Interactions</h2>
            <InteractionFeed platformManager={platformManager} />
          </div>
        </div>
      </div>
    </div>
  );
};
