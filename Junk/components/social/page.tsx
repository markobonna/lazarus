import { PlatformManager } from "@/lib/social/platform-manager";
import { MetricsAnalyzer } from "@/lib/social/metrics-analyzer";
import { SocialDashboard } from "@/components/social/dashboard";
import { PLATFORM_CONFIGS } from "@/config/social";

export default async function SocialPage() {
  const platformManager = new PlatformManager();
  const metricsAnalyzer = new MetricsAnalyzer();

  // Initialize platforms
  await Promise.all(
    Object.values(PLATFORM_CONFIGS).map((config) =>
      platformManager.initializePlatform(config)
    )
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <SocialDashboard
        platformManager={platformManager}
        metricsAnalyzer={metricsAnalyzer}
      />
    </div>
  );
}
