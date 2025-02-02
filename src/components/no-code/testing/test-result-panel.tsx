import React from "react";
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

interface TestResult {
  name: string;
  status: "passed" | "failed";
  duration: string;
  details: string;
}

interface TestResultPanelProps {
  results: TestResult[];
  status: "idle" | "running" | "completed";
}

export const TestResultPanel: React.FC<TestResultPanelProps> = ({
  results,
  status,
}) => {
  const getStatusColor = (status: "passed" | "failed") => {
    return status === "passed" ? "text-green-600" : "text-red-600";
  };

  return (
    <div className="md:col-span-3">
      <Card>
        <div className="p-4 border-b">
          <h3 className="font-medium">Test Results</h3>
        </div>
        <div className="divide-y">
          {results.map((result, index) => (
            <div key={index} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className={`mr-2 ${getStatusColor(result.status)}`}>
                    {result.status === "passed" ? "✓" : "⨯"}
                  </span>
                  <span className="font-medium">{result.name}</span>
                </div>
                <span className="text-sm text-gray-500">{result.duration}</span>
              </div>
              {result.status === "failed" && (
                <div className="mt-2 p-3 bg-red-50 rounded-lg text-sm text-red-700 flex items-start">
                  <AlertCircle className="w-4 h-4 mr-2 mt-0.5" />
                  <p>{result.details}</p>
                </div>
              )}
            </div>
          ))}
          {status === "idle" && results.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              Select a test scenario and click "Run Tests" to begin testing
            </div>
          )}
          {status === "running" && results.length === 0 && (
            <div className="p-4 text-center text-blue-600">
              Initializing tests...
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
