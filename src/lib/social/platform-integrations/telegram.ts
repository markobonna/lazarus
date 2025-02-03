import { PlatformConfig } from "@/types/social";

export class TelegramIntegration {
  private apiKey: string;
  private webhookUrl: string;

  constructor(config: PlatformConfig) {
    if (!config.apiKey) throw new Error("Telegram API key is required");
    this.apiKey = config.apiKey;
    this.webhookUrl = config.webhookUrl || "";
  }

  async initialize(): Promise<void> {
    try {
      await this.setWebhook();
      await this.validateConnection();
    } catch (error) {
      console.error("Telegram initialization failed:", error);
      throw error;
    }
  }

  private async setWebhook(): Promise<void> {
    if (!this.webhookUrl) return;
    const response = await fetch(
      `https://api.telegram.org/bot${this.apiKey}/setWebhook`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: this.webhookUrl }),
      }
    );

    if (!response.ok) throw new Error("Failed to set Telegram webhook");
  }

  private async validateConnection(): Promise<void> {
    const response = await fetch(
      `https://api.telegram.org/bot${this.apiKey}/getMe`
    );
    if (!response.ok) throw new Error("Failed to validate Telegram connection");
  }

  async sendMessage(chatId: string, text: string): Promise<void> {
    const response = await fetch(
      `https://api.telegram.org/bot${this.apiKey}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text }),
      }
    );

    if (!response.ok) throw new Error("Failed to send Telegram message");
  }

  async getUserCount(): Promise<number> {
    const response = await fetch(
      `https://api.telegram.org/bot${this.apiKey}/getChatMembersCount`
    );
    if (!response.ok) return 0;
    const data = await response.json();
    return data.result || 0;
  }
}
