import { NoCodeBuilder } from "../../../Junk/components/agents/no-code/builder";
import { AgentTesting } from "../../../Junk/components/agents/no-code/testing";

export default function NoCodePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NoCodeBuilder />
      <AgentTesting />
    </div>
  );
}
