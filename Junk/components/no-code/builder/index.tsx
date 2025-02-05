import React, { useState, useEffect } from "react";
import { templateManager } from "@/lib/templateManager";
import { deploymentManager } from "@/lib/deploymentManager";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TemplateSelector } from "./template-selector";
import { CapabilityPanel } from "./capability-panel";
import { ConfigurationPanel } from "./configuration-panel";
import { Play, Save } from "lucide-react";
import { AgentTemplate } from "@/types/agent";

export const NoCodeBuilder = () => {
  const [templates, setTemplates] = useState<AgentTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] =
    useState<AgentTemplate | null>(null);
  const [agentConfig, setAgentConfig] = useState({
    name: "",
    description: "",
    capabilities: [],
    parameters: {},
  });
  const [deploymentStatus, setDeploymentStatus] = useState<{
    status: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    const loadTemplates = async () => {
      const loadedTemplates = await templateManager.getTemplates();
      setTemplates(loadedTemplates);
    };
    loadTemplates();
  }, []);

  const handleDeploy = async () => {
    try {
      setDeploymentStatus({
        status: "deploying",
        message: "Starting deployment...",
      });

      const deploymentId = await deploymentManager.deployAgent({
        templateId: selectedTemplate!.id,
        name: agentConfig.name,
        description: agentConfig.description,
        capabilities: agentConfig.capabilities,
        parameters: agentConfig.parameters,
        security: {
          keyManagement: "lit",
          accessControl: [],
        },
        monitoring: {
          metrics: ["performance", "usage", "errors"],
          alertThresholds: {
            errorRate: 0.1,
            responseTime: 1000,
          },
        },
      });

      // Monitor deployment status
      const statusCheck = setInterval(async () => {
        const status = await deploymentManager.getDeploymentStatus(
          deploymentId
        );

        if (status) {
          setDeploymentStatus({
            status: status.status,
            message: status.currentStep,
          });

          if (status.status === "completed" || status.status === "failed") {
            clearInterval(statusCheck);
          }
        }
      }, 2000);
    } catch (error) {
      setDeploymentStatus({
        status: "error",
        message: error.message,
      });
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Create New Agent</h1>
        <div className="flex space-x-4">
          <Button variant="outline" onClick={() => console.log("Saving...")}>
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </Button>
          <Button
            onClick={handleDeploy}
            disabled={
              !selectedTemplate || deploymentStatus?.status === "deploying"
            }
          >
            <Play className="w-4 h-4 mr-2" />
            {deploymentStatus?.status === "deploying"
              ? "Deploying..."
              : "Deploy Agent"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <TemplateSelector
            templates={templates}
            selectedTemplate={selectedTemplate}
            onSelect={setSelectedTemplate}
          />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <ConfigurationPanel config={agentConfig} onChange={setAgentConfig} />
          <CapabilityPanel
            capabilities={selectedTemplate?.capabilities || []}
            selected={agentConfig.capabilities}
            onChange={(capabilities) =>
              setAgentConfig((prev) => ({
                ...prev,
                capabilities,
              }))
            }
          />
        </div>
      </div>

      {deploymentStatus && (
        <Card className="mt-6 p-4">
          <div className="flex items-center space-x-4">
            <div
              className={`w-3 h-3 rounded-full ${
                deploymentStatus.status === "deploying"
                  ? "bg-blue-500"
                  : deploymentStatus.status === "completed"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            />
            <div>
              <h3 className="font-medium capitalize">
                {deploymentStatus.status}
              </h3>
              <p className="text-sm text-gray-600">
                {deploymentStatus.message}
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
