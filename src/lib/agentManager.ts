// src/lib/agentManager.ts

import { AgentTemplate, AgentInstance } from "../types/agent";
import { AVSClient } from "../avs/client";
import { defaultAVSConfig } from "../avs/config";
import { VerificationMiddleware } from "../avs/verificationMiddleware";
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

  // Modify createInstance to include verification
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

  // Add verification to other methods as well
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
  }
}
