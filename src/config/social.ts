export const PLATFORM_CONFIGS = {
  telegram: {
    id: "telegram",
    name: "Telegram",
    webhookUrl: process.env.NEXT_PUBLIC_TELEGRAM_WEBHOOK_URL,
    apiKey: process.env.NEXT_PUBLIC_TELEGRAM_API_KEY,
    status: "active",
  },
  discord: {
    id: "discord",
    name: "Discord",
    webhookUrl: process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL,
    apiKey: process.env.NEXT_PUBLIC_DISCORD_API_KEY,
    status: "active",
  },
  twitter: {
    id: "twitter",
    name: "Twitter",
    apiKey: process.env.NEXT_PUBLIC_TWITTER_API_KEY,
    status: "pending",
  },
} as const;

export const VIRAL_THRESHOLDS = {
  engagement: 75, // Minimum engagement percentage to be considered viral
  shares: 500, // Minimum shares to be considered viral
  timeWindow: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
} as const;
