import React from "react";
import { Card } from "@/components/ui/card";

interface ConfigurationPanelProps {
  config: {
    name: string;
    description: string;
    parameters: Record<string, any>;
  };
  onChange: (config: any) => void;
}

export const ConfigurationPanel: React.FC<ConfigurationPanelProps> = ({
  config,
  onChange,
}) => {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Configuration</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            value={config.name}
            onChange={(e) => onChange({ ...config, name: e.target.value })}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="Enter agent name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            value={config.description}
            onChange={(e) =>
              onChange({ ...config, description: e.target.value })
            }
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            rows={3}
            placeholder="Describe your agent's purpose"
          />
        </div>
      </div>
    </Card>
  );
};
