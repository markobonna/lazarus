import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, StopCircle, RotateCcw, AlertCircle } from "lucide-react";
import { TestScenarioPanel } from "./test-scenario-panel";
import { TestResultPanel } from "./test-result-panel";

interface TestResult {
  name: string;
  status: "passed" | "failed";
  duration: string;
  details: string;
}

export const AgentTesting = () => {
  const [testStatus, setTestStatus] = useState<
    "idle" | "running" | "completed"
  >("idle");
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [selectedScenario, setSelectedScenario] = useState("basic");

  const testScenarios = {
    basic: {
      name: "Basic Functionality",
      tests: ["Action validation", "Response time", "Error handling"],
      description: "Validates core agent functionality and behavior",
    },
    security: {
      name: "Security Checks",
      tests: ["Permission validation", "Transaction limits", "Key management"],
      description: "Tests security measures and access controls",
    },
    performance: {
      name: "Performance Testing",
      tests: ["Concurrent actions", "Resource usage", "Network latency"],
      description: "Evaluates agent performance and efficiency",
    },
  };

  const runTest = async (scenario: string) => {
    setTestStatus("running");
    setTestResults([]);

    // Simulate test execution
    for (const test of testScenarios[scenario].tests) {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setTestResults((prev) => [
        ...prev,
        {
          name: test,
          status: Math.random() > 0.2 ? "passed" : "failed",
          duration: `${(Math.random() * 2 + 0.5).toFixed(2)}s`,
          details: "Test execution details would appear here",
        },
      ]);
    }

    setTestStatus("completed");
  };

  const resetTests = () => {
    setTestStatus("idle");
    setTestResults([]);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Agent Testing</h2>
        <div className="flex space-x-4">
          <Button
            variant="outline"
            onClick={resetTests}
            disabled={testStatus === "running"}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button
            onClick={() => runTest(selectedScenario)}
            disabled={testStatus === "running"}
          >
            {testStatus === "running" ? (
              <StopCircle className="w-4 h-4 mr-2" />
            ) : (
              <PlayCircle className="w-4 h-4 mr-2" />
            )}
            {testStatus === "running" ? "Running..." : "Run Tests"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <TestScenarioPanel
          scenarios={testScenarios}
          selectedScenario={selectedScenario}
          onSelect={setSelectedScenario}
        />
        <TestResultPanel results={testResults} status={testStatus} />
      </div>
    </div>
  );
};
