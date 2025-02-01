import { CdpToolkit } from "@coinbase/cdp-langchain";
import { ChatOpenAI } from "@langchain/openai";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { configureAgent } from "./agent";

export async function setupLangChainAgent() {
  const { config, verificationMiddleware } = await configureAgent();

  // Create toolkit
  const toolkit = new CdpToolkit(config.agentkit);

  // Get available tools
  const tools = toolkit.getTools().map((tool) => ({
    ...tool,
    // Wrap each tool with verification middleware
    func: async (...args: any[]) => {
      const isVerified = await verificationMiddleware.verifyAgentAction(
        config as any, // TODO: Create proper instance
        tool.name,
        { args }
      );

      if (!isVerified) {
        throw new Error(`Action ${tool.name} was not verified by AVS`);
      }

      return tool.func(...args);
    },
  }));

  // Initialize LLM
  const model = new ChatOpenAI({
    model: "gpt-4-0125-preview", // or your preferred model
  });

  // Create agent executor
  const agent = createReactAgent({
    llm: model,
    tools,
  });

  return agent;
}
