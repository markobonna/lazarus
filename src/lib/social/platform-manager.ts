import {
  PlatformConfig,
  PlatformStatus,
  Interaction,
  ViralContent,
} from "@/types/social";

export class PlatformManager {
  private platforms: Map<string, PlatformStatus>;
  private interactions: Interaction[];
  private viralContent: ViralContent[];

  constructor() {
    this.platforms = new Map();
    this.interactions = [];
    this.viralContent = [];
  }

  async initializePlatform(config: PlatformConfig): Promise<void> {
    try {
      const status: PlatformStatus = {
        id: config.id,
        name: config.name,
        status: "active",
        users: 0,
        lastSync: new Date().toISOString(),
        errorCount: 0,
      };
      await this.setupWebhooks(config);
      await this.validateApiKey(config);
      this.platforms.set(config.id, status);
    } catch (error) {
      console.error(`Failed to initialize ${config.name}:`, error);
      this.platforms.set(config.id, {
        id: config.id,
        name: config.name,
        status: "inactive",
        users: 0,
        lastSync: new Date().toISOString(),
        errorCount: 1,
      });
    }
  }

  private async setupWebhooks(config: PlatformConfig): Promise<void> {
    if (!config.webhookUrl) return;
    // Platform-specific webhook setup would go here
  }

  private async validateApiKey(config: PlatformConfig): Promise<void> {
    if (!config.apiKey) return;
    // Platform-specific API key validation would go here
  }

  async recordInteraction(
    interaction: Omit<Interaction, "id">
  ): Promise<Interaction> {
    const newInteraction: Interaction = {
      ...interaction,
      id: `int-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    this.interactions.unshift(newInteraction);
    this.interactions = this.interactions.slice(0, 100); // Keep last 100 interactions
    return newInteraction;
  }

  async recordViralContent(
    content: Omit<ViralContent, "id">
  ): Promise<ViralContent> {
    const newContent: ViralContent = {
      ...content,
      id: `vc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    };
    this.viralContent.unshift(newContent);
    this.viralContent = this.viralContent.slice(0, 50); // Keep last 50 viral contents
    return newContent;
  }

  async getRecentInteractions(limit: number = 10): Promise<Interaction[]> {
    return this.interactions.slice(0, limit);
  }

  async getViralContent(limit: number = 10): Promise<ViralContent[]> {
    return this.viralContent.slice(0, limit);
  }

  async getPlatformStatus(platformId: string): Promise<PlatformStatus | null> {
    return this.platforms.get(platformId) || null;
  }

  async getAllPlatformStatuses(): Promise<PlatformStatus[]> {
    return Array.from(this.platforms.values());
  }
}
