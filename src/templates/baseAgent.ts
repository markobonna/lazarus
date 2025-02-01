import { AgentTemplate } from "../types/agent";

export const baseAgentTemplate: AgentTemplate = {
  id: "base-agent",
  name: "Base Agent Template",
  description: "Basic agent template with core functionality",
  capabilities: [
    "transaction_execution",
    "contract_interaction",
    "gas_estimation",
  ],
  requiredActions: ["send_transaction", "read_contract", "estimate_gas"],
  defaultConfig: {
    maxConcurrentTasks: 5,
    retryAttempts: 3,
    logLevel: "info",
  },
};
