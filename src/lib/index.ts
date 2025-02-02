import { AgentTemplate, AgentInstance } from "@/types/agent";
import { AVSClient } from "@/avs/client";
import { defaultAVSConfig } from "@/avs/config";
import { VerificationMiddleware } from "@/avs/verificationMiddleware";
import { ethers } from "ethers";

export class AgentManager {
  private templates: Map<string, AgentTemplate>;
  private instances: Map<string, AgentInstance>;
  private avsClient: AVSClient;
  private verificationMiddleware: VerificationMiddleware;

  constructor(provider: ethers.providers.Provider, signer: ethers.Signer) {
    this.templates = new Map();
    this.instances = new Map();

    // Initialize AVS client
    this.avsClient = new AVSClient(defaultAVSConfig, provider, signer);

    // Initialize verification middleware
    this.verificationMiddleware = new VerificationMiddleware(this.avsClient);
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

    // Verify instance creation
    const verified = await this.verificationMiddleware.verifyAgentAction(
      instance,
      "create_instance",
      { templateId, config }
    );

    if (!verified) {
      throw new Error("Instance creation verification failed");
    }

    this.instances.set(instance.instanceId, instance);
    return instance;
  }

  async startInstance(instanceId: string) {
    const instance = this.instances.get(instanceId);
    if (!instance) {
      throw new Error(`Instance ${instanceId} not found`);
    }

    const verified = await this.verificationMiddleware.verifyAgentAction(
      instance,
      "start_instance",
      {}
    );

    if (!verified) {
      throw new Error("Instance start verification failed");
    }

    instance.status = "running";
    await this.updateInstanceMetrics(instance.instanceId);
  }

  async stopInstance(instanceId: string) {
    const instance = this.instances.get(instanceId);
    if (!instance) {
      throw new Error(`Instance ${instanceId} not found`);
    }

    const verified = await this.verificationMiddleware.verifyAgentAction(
      instance,
      "stop_instance",
      {}
    );

    if (!verified) {
      throw new Error("Instance stop verification failed");
    }

    instance.status = "stopped";
    await this.updateInstanceMetrics(instance.instanceId);
  }

  async pauseInstance(instanceId: string) {
    const instance = this.instances.get(instanceId);
    if (!instance) {
      throw new Error(`Instance ${instanceId} not found`);
    }

    const verified = await this.verificationMiddleware.verifyAgentAction(
      instance,
      "pause_instance",
      {}
    );

    if (!verified) {
      throw new Error("Instance pause verification failed");
    }

    instance.status = "paused";
    await this.updateInstanceMetrics(instance.instanceId);
  }

  async deleteInstance(instanceId: string) {
    const instance = this.instances.get(instanceId);
    if (!instance) {
      throw new Error(`Instance ${instanceId} not found`);
    }

    const verified = await this.verificationMiddleware.verifyAgentAction(
      instance,
      "delete_instance",
      {}
    );

    if (!verified) {
      throw new Error("Instance deletion verification failed");
    }

    this.instances.delete(instanceId);
  }

  getInstance(instanceId: string): AgentInstance | undefined {
    return this.instances.get(instanceId);
  }

  getAllInstances(): AgentInstance[] {
    return Array.from(this.instances.values());
  }

  getTemplate(templateId: string): AgentTemplate | undefined {
    return this.templates.get(templateId);
  }

  getAllTemplates(): AgentTemplate[] {
    return Array.from(this.templates.values());
  }

  private async updateInstanceMetrics(instanceId: string) {
    const instance = this.instances.get(instanceId);
    if (!instance) return;

    instance.metrics = {
      ...instance.metrics,
      lastActive: Date.now(),
    };
  }

  // Method to update instance metrics after successful transactions
  async recordTransactionSuccess(instanceId: string) {
    const instance = this.instances.get(instanceId);
    if (!instance) return;

    const currentSuccess =
      instance.metrics.totalTransactions * (instance.metrics.successRate / 100);
    const newTotal = instance.metrics.totalTransactions + 1;
    const newSuccessRate = ((currentSuccess + 1) / newTotal) * 100;

    instance.metrics = {
      ...instance.metrics,
      totalTransactions: newTotal,
      successRate: newSuccessRate,
      lastActive: Date.now(),
    };
  }

  // Method to update instance metrics after failed transactions
  async recordTransactionFailure(instanceId: string) {
    const instance = this.instances.get(instanceId);
    if (!instance) return;

    const currentSuccess =
      instance.metrics.totalTransactions * (instance.metrics.successRate / 100);
    const newTotal = instance.metrics.totalTransactions + 1;
    const newSuccessRate = (currentSuccess / newTotal) * 100;

    instance.metrics = {
      ...instance.metrics,
      totalTransactions: newTotal,
      successRate: newSuccessRate,
      lastActive: Date.now(),
    };
  }

  // Method to check if an instance exists
  hasInstance(instanceId: string): boolean {
    return this.instances.has(instanceId);
  }

  // Method to get instance status
  getInstanceStatus(instanceId: string): string | undefined {
    return this.instances.get(instanceId)?.status;
  }

  // Method to get instance metrics
  getInstanceMetrics(instanceId: string) {
    return this.instances.get(instanceId)?.metrics;
  }
}
