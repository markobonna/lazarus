import React from "react";
import { Card } from "@/components/ui/card";
import { AgentTemplate } from "@/types/agent";

interface TemplateSelectorProps {
  templates: AgentTemplate[];
  selectedTemplate: AgentTemplate | null;
  onSelect: (template: AgentTemplate) => void;
}

export const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  templates,
  selectedTemplate,
  onSelect,
}) => {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Templates</h2>
      <div className="space-y-3">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => onSelect(template)}
            className={`p-4 rounded-lg border cursor-pointer transition-colors
              ${
                selectedTemplate?.id === template.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-blue-300"
              }`}
          >
            <h3 className="font-medium">{template.name}</h3>
            <p className="text-sm text-gray-600">{template.description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};
