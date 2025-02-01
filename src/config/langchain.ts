import { CdpToolkit } from "@coinbase/cdp-langchain";
import { ChatOpenAI } from "@langchain/openai";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { configureAgent } from "./agent";

export async function setupLangChainAgent() {
  const agentConfig = await configureAgent();

  // Create toolkit
  const toolkit = new CdpToolkit(agentConfig.agentkit);

  // Get available tools
  const tools = toolkit.getTools();

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
