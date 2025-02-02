export interface SecurityMetrics {
  authAttempts: number;
  failedAttempts: number;
  lastCompromiseAttempt: number | null;
  activeKeys: number;
  averageKeyAge: number;
}

export interface SecurityAlert {
  id: string;
  severity: "low" | "medium" | "high" | "critical";
  type: string;
  message: string;
  timestamp: number;
  metadata: Record<string, any>;
}
