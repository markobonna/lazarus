import React from "react";
import { Card } from "@/components/ui/card";

interface TestScenarioPanelProps {
  scenarios: Record<
    string,
    {
      name: string;
      tests: string[];
      description: string;
    }
  >;
  selectedScenario: string;
  onSelect: (scenario: string) => void;
}

export const TestScenarioPanel: React.FC<TestScenarioPanelProps> = ({
  scenarios,
  selectedScenario,
  onSelect,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-gray-700">Test Scenarios</h3>
      {Object.entries(scenarios).map(([key, scenario]) => (
        <Card
          key={key}
          className={`p-4 cursor-pointer transition-colors ${
            selectedScenario === key
              ? "border-blue-500 bg-blue-50"
              : "hover:border-blue-300"
          }`}
          onClick={() => onSelect(key)}
        >
          <h4 className="font-medium">{scenario.name}</h4>
          <p className="text-sm text-gray-600 mt-1">{scenario.description}</p>
          <p className="text-sm text-gray-500 mt-2">
            {scenario.tests.length} tests
          </p>
        </Card>
      ))}
    </div>
  );
};
