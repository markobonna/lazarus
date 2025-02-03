import { PlatformConfig } from "@/types/social";

export class DiscordIntegration {
  private apiKey: string;
  private webhookUrl: string;

  constructor(config: PlatformConfig) {
    if (!config.apiKey) throw new Error("Discord API key is required");
    this.apiKey = config.apiKey;
    this.webhookUrl = config.webhookUrl || "";
  }

  async initialize(): Promise<void> {
    try {
      await this.validateConnection();
      if (this.webhookUrl) await this.validateWebhook();
    } catch (error) {
      console.error("Discord initialization failed:", error);
      throw error;
    }
  }

  private async validateConnection(): Promise<void> {
    const response = await fetch("https://discord.com/api/v10/users/@me", {
      headers: { Authorization: `Bot ${this.apiKey}` },
    });

    if (!response.ok) throw new Error("Failed to validate Discord connection");
  }

  private async validateWebhook(): Promise<void> {
    const response = await fetch(this.webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: "Webhook test" }),
    });

    if (!response.ok) throw new Error("Failed to validate Discord webhook");
  }

  async sendMessage(channelId: string, content: string): Promise<void> {
    const response = await fetch(
      `https://discord.com/api/v10/channels/${channelId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bot ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      }
    );

    if (!response.ok) throw new Error("Failed to send Discord message");
  }

  async getMemberCount(): Promise<number> {
    const response = await fetch("https://discord.com/api/v10/guilds", {
      headers: { Authorization: `Bot ${this.apiKey}` },
    });

    if (!response.ok) return 0;
    const guilds = await response.json();
    return guilds.reduce(
      (total: number, guild: any) =>
        total + (guild.approximate_member_count || 0),
      0
    );
  }
}
