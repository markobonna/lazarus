import { PlatformConfig } from "@/types/social";

export class TwitterIntegration {
  private apiKey: string;

  constructor(config: PlatformConfig) {
    if (!config.apiKey) throw new Error("Twitter API key is required");
    this.apiKey = config.apiKey;
  }

  async initialize(): Promise<void> {
    try {
      await this.validateCredentials();
    } catch (error) {
      console.error("Twitter initialization failed:", error);
      throw error;
    }
  }

  private async validateCredentials(): Promise<void> {
    const response = await fetch("https://api.twitter.com/2/users/me", {
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Failed to validate Twitter credentials");
  }

  async tweet(content: string): Promise<void> {
    const response = await fetch("https://api.twitter.com/2/tweets", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: content }),
    });

    if (!response.ok) throw new Error("Failed to send tweet");
  }

  async getFollowerCount(): Promise<number> {
    const response = await fetch(
      "https://api.twitter.com/2/users/me?user.fields=public_metrics",
      {
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) return 0;
    const data = await response.json();
    return data.data.public_metrics.followers_count || 0;
  }
}
