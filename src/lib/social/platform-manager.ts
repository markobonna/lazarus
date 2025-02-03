import { PlatformConfig, PlatformStatus, Interaction } from "@/types/social";
import { TelegramIntegration } from "./platform-integrations/telegram";
import { DiscordIntegration } from "./platform-integrations/discord";
import { TwitterIntegration } from "./platform-integrations/twitter";

export class PlatformManager {
  private platforms: Map<string, any>;
  private statuses: Map<string, PlatformStatus>;

  constructor() {
    this.platforms = new Map();
    this.statuses = new Map();
  }

  async initializePlatform(config: PlatformConfig): Promise<void> {
    try {
      const platform = this.createPlatformInstance(config);
      await platform.initialize();

      this.platforms.set(config.id, platform);
      this.updateStatus(config.id, {
        id: config.id,
        name: config.name,
        status: "active",
        users: await this.getUserCount(config.id),
        lastSync: new Date().toISOString(),
        errorCount: 0,
      });
    } catch (error) {
      console.error(`Failed to initialize ${config.name}:`, error);
      this.updateStatus(config.id, {
        id: config.id,
        name: config.name,
        status: "inactive",
        users: 0,
        lastSync: new Date().toISOString(),
        errorCount: 1,
      });
    }
  }

  private createPlatformInstance(config: PlatformConfig): any {
    switch (config.id) {
      case "telegram":
        return new TelegramIntegration(config);
      case "discord":
        return new DiscordIntegration(config);
      case "twitter":
        return new TwitterIntegration(config);
      default:
        throw new Error(`Unsupported platform: ${config.id}`);
    }
  }

  private updateStatus(platformId: string, status: PlatformStatus): void {
    this.statuses.set(platformId, status);
  }

  async getUserCount(platformId: string): Promise<number> {
    const platform = this.platforms.get(platformId);
    if (!platform) return 0;

    switch (platformId) {
      case "telegram":
        return platform.getUserCount();
      case "discord":
        return platform.getMemberCount();
      case "twitter":
        return platform.getFollowerCount();
      default:
        return 0;
    }
  }

  async sendMessage(
    platformId: string,
    message: string,
    channelId?: string
  ): Promise<void> {
    const platform = this.platforms.get(platformId);
    if (!platform) throw new Error(`Platform ${platformId} not initialized`);

    switch (platformId) {
      case "telegram":
        await platform.sendMessage(channelId || "", message);
        break;
      case "discord":
        await platform.sendMessage(channelId || "", message);
        break;
      case "twitter":
        await platform.tweet(message);
        break;
      default:
        throw new Error(`Unsupported platform: ${platformId}`);
    }
  }

  getStatus(platformId: string): PlatformStatus | undefined {
    return this.statuses.get(platformId);
  }

  getAllStatuses(): PlatformStatus[] {
    return Array.from(this.statuses.values());
  }
}
