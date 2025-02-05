"use client";

import { useState } from "react";
import {
  AgentKit,
  CdpWalletProvider,
  type WalletProvider,
  type AgentKitConfig,
  type TransactionResponse,
  walletActionProvider,
  cdpWalletActionProvider,
} from "@coinbase/agentkit";
import { Button } from "@/components/ui/button";

interface DeploymentError {
  message: string;
}

export default function ContractDeployment() {
  const [bytecode, setBytecode] = useState<string>("");
  const [abi, setAbi] = useState<string>("");
  const [constructorArgs, setConstructorArgs] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [deployedAddress, setDeployedAddress] = useState<string>("");

  const handleDeploy = async () => {
    try {
      const config: AgentKitConfig = {
        apiKeyName: process.env.CDP_API_KEY_NAME!,
        apiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY!,
        networkId: process.env.NETWORK_ID || "base-sepolia",
      };

      const walletProvider = (await CdpWalletProvider.configureWithWallet(
        config
      )) as WalletProvider;

      const agentkit = await AgentKit.from({
        walletProvider,
        actionProviders: [
          walletActionProvider(),
          cdpWalletActionProvider(config),
        ],
      });

      setStatus("Deploying contract...");

      // Parse constructor arguments if provided
      const args = constructorArgs ? JSON.parse(constructorArgs) : [];

      const tx: TransactionResponse = await agentkit.deployContract({
        bytecode,
        abi: JSON.parse(abi),
        args,
      });

      setDeployedAddress(tx.contractAddress || "");
      setStatus(
        `Contract deployed successfully! Address: ${tx.contractAddress}`
      );
    } catch (error: unknown) {
      const err = error as DeploymentError;
      console.error("Deployment failed:", err);
      setStatus(`Deployment failed: ${err.message}`);
    }
  };

  return (
    <div className="p-4 border rounded-lg space-y-4">
      <h2 className="text-xl font-semibold mb-4">Contract Deployment</h2>
      <div className="space-y-4">
        <textarea
          placeholder="Contract Bytecode"
          className="w-full p-2 border rounded h-32"
          value={bytecode}
          onChange={(e) => setBytecode(e.target.value)}
        />
        <textarea
          placeholder="Contract ABI (JSON format)"
          className="w-full p-2 border rounded h-32"
          value={abi}
          onChange={(e) => setAbi(e.target.value)}
        />
        <textarea
          placeholder="Constructor Arguments (JSON array)"
          className="w-full p-2 border rounded"
          value={constructorArgs}
          onChange={(e) => setConstructorArgs(e.target.value)}
        />
        <Button
          className="w-full bg-blue-500 text-white hover:bg-blue-600"
          onClick={handleDeploy}
        >
          Deploy Contract
        </Button>
        {status && (
          <div className="mt-4 p-2 border rounded bg-gray-50">
            <p>{status}</p>
          </div>
        )}
        {deployedAddress && (
          <div className="mt-4 p-2 border rounded bg-gray-50">
            <p>Deployed Address: {deployedAddress}</p>
          </div>
        )}
      </div>
    </div>
  );
}
