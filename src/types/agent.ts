export interface AgentTemplate {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  requiredActions: string[];
  defaultConfig: Record<string, any>;
}

export interface AgentInstance {
  templateId: string;
  instanceId: string;
  status: "initializing" | "running" | "paused" | "stopped";
  config: Record<string, any>;
  metrics: {
    lastActive: number;
    totalTransactions: number;
    successRate: number;
  };
}
