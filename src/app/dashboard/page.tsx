"use client";
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle, PlayCircle, StopCircle } from "lucide-react";
import { setupLangChainAgent } from "@/config/langchain";
import { CdpAgentkit } from "@coinbase/cdp-agentkit-core";

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const agentManager = new AgentManager(provider, signer);


const AgentDashboard = () => {
  const [wallet, setWallet] = useState(null);
  const [agent, setAgent] = useState(null);
  const [instances, setInstances] = useState([]);
  const [isConnecting, setIsConnecting] = useState(false);

  const connect = async () => {
    try {
      setIsConnecting(true);
      // Initialize CDP AgentKit
      const agentkit = await CdpAgentkit.configureWithWallet();
      const walletDetails = await agentkit.getWalletDetails(); // Use public method instead of accessing private property
      setWallet(walletDetails);

      // Setup LangChain agent
      const langChainAgent = await setupLangChainAgent();
      setAgent(langChainAgent as any); // Type assertion to fix type error
    } catch (error) {
      console.error("Failed to connect:", error);
    } finally {
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    // Load agent instances
    if (wallet && agent) {
      loadInstances();
    }
  }, [wallet, agent]);

  const loadInstances = async () => {
    try {
      // Here you would implement loading your agent instances
      // This is just an example structure
      const mockInstances = [
        {
          instanceId: "1",
          name: "AMER Agent 1",
          status: "running",
          templateId: "base-template",
        },
      ];
      setInstances(mockInstances);
    } catch (error) {
      console.error("Failed to load instances:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Agent Dashboard</h1>
        {!wallet ? (
          <Button
            onClick={connect}
            className="bg-blue-500 text-white"
            disabled={isConnecting}
          >
            {isConnecting ? "Connecting..." : "Connect Wallet"}
          </Button>
        ) : (
          <div className="text-sm text-gray-600">
            Connected: {(wallet as { address: string }).address}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {instances.map(
          (instance: {
            instanceId: string;
            name: string;
            status: string;
            templateId: string;
          }) => (
            <AgentCard key={instance.instanceId} instance={instance} />
          )
        )}
      </div>
    </div>
  );
};
const AgentCard = ({
  instance,
}: {
  instance: { status: string; name: string; templateId: string };
}) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "paused":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case "stopped":
        return <StopCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  const handleStart = async () => {
    // Implement start logic using CDP toolkit
  };

  const handleStop = async () => {
    // Implement stop logic using CDP toolkit
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
          </div>
          <div className="flex space-x-2">
            <Button
              className="bg-green-500 text-white"
              disabled={instance.status === "running"}
              onClick={handleStart}
            >
              <PlayCircle className="h-4 w-4 mr-2" />
              Start
            </Button>
            <Button
              className="bg-red-500 text-white"
              disabled={instance.status === "stopped"}
              onClick={handleStop}
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

export default AgentDashboard;
