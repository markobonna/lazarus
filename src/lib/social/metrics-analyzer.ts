import { SocialMetrics, Interaction, ViralContent } from "@/types/social";

export class MetricsAnalyzer {
  private metricsHistory: Map<string, SocialMetrics[]>;

  constructor() {
    this.metricsHistory = new Map();
  }

  async calculateMetrics(
    platform: string,
    interactions: Interaction[],
    viralContent: ViralContent[],
    period: "daily" | "weekly" | "monthly" = "daily"
  ): Promise<SocialMetrics> {
    const engagement = this.calculateEngagement(interactions, viralContent);
    const reach = this.calculateReach(interactions, viralContent);
    const viralScore = this.calculateViralScore(viralContent);
    const activeChains = this.countActiveChains(interactions);

    const metrics: SocialMetrics = {
      engagement,
      reach,
      viralScore,
      activeChains,
      platform,
      period,
    };

    this.storeMetrics(platform, metrics);
    return metrics;
  }

  private calculateEngagement(
    interactions: Interaction[],
    viralContent: ViralContent[]
  ): number {
    const interactionEngagement = interactions.reduce(
      (sum, int) => sum + int.metrics.engagement,
      0
    );
    const viralEngagement = viralContent.reduce(
      (sum, content) => sum + content.engagement,
      0
    );
    const total = interactions.length + viralContent.length;
    return total > 0 ? (interactionEngagement + viralEngagement) / total : 0;
  }

  private calculateReach(
    interactions: Interaction[],
    viralContent: ViralContent[]
  ): number {
    const viralReach = viralContent.reduce(
      (sum, content) => sum + content.shares * 2.5,
      0
    );
    return Math.floor(interactions.length * 10 + viralReach);
  }

  private calculateViralScore(viralContent: ViralContent[]): number {
    if (viralContent.length === 0) return 0;
    const totalEngagement = viralContent.reduce(
      (sum, content) => sum + content.engagement,
      0
    );
    const totalShares = viralContent.reduce(
      (sum, content) => sum + content.shares,
      0
    );
    return (
      (totalEngagement / viralContent.length +
        totalShares / viralContent.length) /
      20
    );
  }

  private countActiveChains(interactions: Interaction[]): number {
    const chains = new Set(interactions.map((int) => int.platform));
    return chains.size;
  }

  private storeMetrics(platform: string, metrics: SocialMetrics): void {
    if (!this.metricsHistory.has(platform)) {
      this.metricsHistory.set(platform, []);
    }
    const history = this.metricsHistory.get(platform)!;
    history.unshift(metrics);
    this.metricsHistory.set(platform, history.slice(0, 100)); // Keep last 100 metrics
  }

  async getMetricsHistory(
    platform: string,
    period: "daily" | "weekly" | "monthly" = "daily",
    limit: number = 30
  ): Promise<SocialMetrics[]> {
    const history = this.metricsHistory.get(platform) || [];
    return history.filter((m) => m.period === period).slice(0, limit);
  }
}
