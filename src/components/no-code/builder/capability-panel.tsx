import React from "react";
import { Card } from "@/components/ui/card";

interface CapabilityPanelProps {
  capabilities: string[];
  selected: string[];
  onChange: (capabilities: string[]) => void;
}

export const CapabilityPanel: React.FC<CapabilityPanelProps> = ({
  capabilities,
  selected,
  onChange,
}) => {
  const handleToggle = (capability: string) => {
    const updatedCapabilities = selected.includes(capability)
      ? selected.filter((c) => c !== capability)
      : [...selected, capability];
    onChange(updatedCapabilities);
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Capabilities</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {capabilities.map((capability) => (
          <div
            key={capability}
            onClick={() => handleToggle(capability)}
            className={`p-4 rounded-lg border cursor-pointer transition-colors
              ${
                selected.includes(capability)
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-green-300"
              }`}
          >
            <span className="font-medium">{capability}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
