import { AgentInstance } from "../types/agent";
import { AVSClient } from "./client";
import { VerificationRequest } from "./types";

export class VerificationMiddleware {
  private avsClient: AVSClient;

  constructor(avsClient: AVSClient) {
    this.avsClient = avsClient;
  }

  async verifyAgentAction(
    agent: AgentInstance,
    action: string,
    params: Record<string, any>
  ): Promise<boolean> {
    const request: VerificationRequest = {
      taskId: `${agent.instanceId}-${Date.now()}`,
      agentId: agent.instanceId,
      action,
      params,
      timestamp: Date.now(),
      signature: "", // To be implemented with proper agent signing
    };

    const response = await this.avsClient.verifyAgentAction(request);
    return response.status === "approved";
  }
}
