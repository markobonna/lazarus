import { NoCodeBuilder } from "@/components/no-code/builder";
import { AgentTesting } from "@/components/no-code/testing";

export default function NoCodePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NoCodeBuilder />
      <AgentTesting />
    </div>
  );
}
