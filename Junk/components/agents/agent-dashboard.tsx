"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AgentCard } from "./agent-card";

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

export const AgentDashboard = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState("");
  const [instances, setInstances] = useState<AgentInstance[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isConnected) {
      const mockInstances: AgentInstance[] = [
        {
          instanceId: "1",
          name: "DeFi Agent",
          templateId: "defi-template",
          status: "running",
          metrics: {
            lastActive: Date.now(),
            totalTransactions: 45,
            successRate: 0.98,
          },
        },
        {
          instanceId: "2",
          name: "Social Agent",
          templateId: "social-template",
          status: "paused",
          metrics: {
            lastActive: Date.now() - 3600000,
            totalTransactions: 23,
            successRate: 0.95,
          },
        },
      ];
      setInstances(mockInstances);
    }
  }, [isConnected]);

  const connectWallet = async () => {
    try {
      setIsConnected(true);
      setAddress("0x1234...5678");
    } catch (err) {
      setError("Failed to connect wallet");
    }
  };

  const handleStatusChange = (
    instanceId: string,
    newStatus: AgentInstance["status"]
  ) => {
    setInstances((prev) =>
      prev.map((instance) =>
        instance.instanceId === instanceId
          ? { ...instance, status: newStatus }
          : instance
      )
    );
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Agent Dashboard</h1>
        {!isConnected ? (
          <Button
            onClick={connectWallet}
            className="bg-blue-500 text-white hover:bg-blue-600"
          >
            <Wallet className="h-4 w-4 mr-2" />
            Connect Wallet
          </Button>
        ) : (
          <div className="text-sm text-gray-600">Connected: {address}</div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-md">
            {error}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {instances.map((instance) => (
          <AgentCard
            key={instance.instanceId}
            instance={instance}
            onStatusChange={(status) =>
              handleStatusChange(instance.instanceId, status)
            }
          />
        ))}
      </div>
    </div>
  );
};
