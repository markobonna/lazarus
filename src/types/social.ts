export interface PlatformConfig {
  id: string;
  name: string;
  apiKey?: string;
  webhookUrl?: string;
  status: "active" | "pending" | "inactive";
}

export interface SocialMetrics {
  engagement: number;
  reach: number;
  viralScore: number;
  activeChains: number;
  platform: string;
  period: "daily" | "weekly" | "monthly";
}

export interface Interaction {
  id: string;
  type: "response" | "alert" | "notification";
  platform: string;
  content: string;
  timestamp: string;
  metrics: {
    engagement: number;
    accuracy: number;
  };
}

export interface ViralContent {
  id: string;
  type: string;
  platform: string;
  content: string;
  shares: number;
  engagement: number;
  timestamp: string;
}

export interface PlatformStatus {
  id: string;
  name: string;
  status: "active" | "pending" | "inactive";
  users: number;
  lastSync: string;
  errorCount: number;
}
