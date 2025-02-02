import * as React from "react";
import { AlertCircle, CheckCircle, PlayCircle, StopCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface AgentInstance {
  instanceId: string;
  name: string;
  templateId: string;
  status: "initializing" | "running" | "paused" | "stopped";
  metrics: {
    lastActive: number;
    totalTransactions: number;
    successRate: number;
  };
}

interface AgentCardProps {
  instance: AgentInstance;
  onStatusChange: (status: AgentInstance["status"]) => void;
}

export const AgentCard = ({ instance, onStatusChange }: AgentCardProps) => {
  const getStatusIcon = (status: AgentInstance["status"]) => {
    switch (status) {
      case "running":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "paused":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case "stopped":
        return <StopCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleStart = () => {
    onStatusChange("running");
  };

  const handleStop = () => {
    onStatusChange("stopped");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{instance.name}</span>
          {getStatusIcon(instance.status)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600">
              Template: {instance.templateId}
            </p>
            <p className="text-sm text-gray-600">Status: {instance.status}</p>
            <div className="mt-2">
              <p className="text-sm text-gray-600">
                Transactions: {instance.metrics.totalTransactions}
              </p>
              <p className="text-sm text-gray-600">
                Success Rate: {(instance.metrics.successRate * 100).toFixed(1)}%
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              onClick={handleStart}
              className="bg-green-500 text-white hover:bg-green-600"
              disabled={instance.status === "running"}
            >
              <PlayCircle className="h-4 w-4 mr-2" />
              Start
            </Button>
            <Button
              onClick={handleStop}
              className="bg-red-500 text-white hover:bg-red-600"
              disabled={instance.status === "stopped"}
            >
              <StopCircle className="h-4 w-4 mr-2" />
              Stop
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
