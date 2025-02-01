import { AgentTemplate, AgentInstance } from "../types/agent";

export class AgentManager {
  private templates: Map<string, AgentTemplate>;
  private instances: Map<string, AgentInstance>;

  constructor() {
    this.templates = new Map();
    this.instances = new Map();
  }

  registerTemplate(template: AgentTemplate) {
    this.templates.set(template.id, template);
  }

  async createInstance(
    templateId: string,
    config: Record<string, any>
  ): Promise<AgentInstance> {
    const template = this.templates.get(templateId);
    if (!template) {
      throw new Error(`Template ${templateId} not found`);
    }

    const instance: AgentInstance = {
      templateId,
      instanceId: `${templateId}-${Date.now()}`,
      status: "initializing",
      config: {
        ...template.defaultConfig,
        ...config,
      },
      metrics: {
        lastActive: Date.now(),
        totalTransactions: 0,
        successRate: 0,
      },
    };

    this.instances.set(instance.instanceId, instance);
    return instance;
  }

  async startInstance(instanceId: string) {
    const instance = this.instances.get(instanceId);
    if (!instance) {
      throw new Error(`Instance ${instanceId} not found`);
    }
    instance.status = "running";
    // Initialize agent runtime here
  }

  async stopInstance(instanceId: string) {
    const instance = this.instances.get(instanceId);
    if (!instance) {
      throw new Error(`Instance ${instanceId} not found`);
    }
    instance.status = "stopped";
    // Cleanup agent runtime here
  }
}
