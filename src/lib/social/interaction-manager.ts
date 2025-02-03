import { Interaction, ViralContent } from "@/types/social";
import {
  calculateEngagementScore,
  calculateViralityScore,
} from "./utils/metrics-helpers";

export class InteractionManager {
  private interactions: Map<string, Interaction>;
  private viralContent: Map<string, ViralContent>;

  constructor() {
    this.interactions = new Map();
    this.viralContent = new Map();
  }

  async trackInteraction(
    interaction: Omit<Interaction, "id">
  ): Promise<Interaction> {
    const id = `int-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newInteraction: Interaction = { ...interaction, id };

    this.interactions.set(id, newInteraction);
    await this.checkViralPotential(newInteraction);

    return newInteraction;
  }

  private async checkViralPotential(interaction: Interaction): Promise<void> {
    const engagement = calculateEngagementScore(
      interaction.metrics.engagement,
      100,
      Date.now() - new Date(interaction.timestamp).getTime()
    );

    if (engagement > 75) {
      const viralContent: ViralContent = {
        id: `vc-${interaction.id}`,
        type: interaction.type,
        platform: interaction.platform,
        content: interaction.content,
        shares: Math.floor(Math.random() * 1000),
        engagement,
        timestamp: interaction.timestamp,
      };

      this.viralContent.set(viralContent.id, viralContent);
    }
  }

  getRecentInteractions(limit: number = 10): Interaction[] {
    return Array.from(this.interactions.values())
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
      .slice(0, limit);
  }

  getViralContent(limit: number = 10): ViralContent[] {
    return Array.from(this.viralContent.values())
      .sort((a, b) => b.engagement - a.engagement)
      .slice(0, limit);
  }
}
