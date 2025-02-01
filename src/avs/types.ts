export interface AVSConfig {
  operatorAddress: string;
  registryContract: string;
  stakingContract: string;
  quorumThreshold: number;
  taskTimeout: number;
}

export interface VerificationRequest {
  taskId: string;
  agentId: string;
  action: string;
  params: Record<string, any>;
  timestamp: number;
  signature: string;
}

export interface VerificationResponse {
  taskId: string;
  status: "approved" | "rejected" | "pending";
  quorumMet: boolean;
  signatures: string[];
  timestamp: number;
}
