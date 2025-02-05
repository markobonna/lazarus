"use client";

import { useState } from "react";
import {
  AgentKit,
  CdpWalletProvider,
  type WalletProvider,
  walletActionProvider,
  cdpWalletActionProvider,
} from "@coinbase/agentkit";
import { Button } from "@/components/ui/button";

interface TransferError {
  message: string;
}

export default function TokenTransfer() {
  const [toAddress, setToAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const handleTransfer = async () => {
    try {
      const config = {
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

      setStatus("Initiating transfer...");

      const result = await agentkit.executeAction("wallet_transfer", {
        to: toAddress,
        amount: amount,
        network: "base-sepolia",
      });

      setStatus(`Transfer successful! ${result}`);
    } catch (error: unknown) {
      const err = error as TransferError;
      console.error("Transfer failed:", err);
      setStatus(`Transfer failed: ${err.message}`);
    }
  };

  return (
    <div className="p-4 border rounded-lg space-y-4">
      <h2 className="text-xl font-semibold mb-4">Transfer ETH</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Recipient Address"
          className="w-full p-2 border rounded"
          value={toAddress}
          onChange={(e) => setToAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Amount in ETH"
          className="w-full p-2 border rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button
          className="w-full bg-blue-500 text-white hover:bg-blue-600"
          onClick={handleTransfer}
        >
          Send ETH
        </Button>
        {status && (
          <div className="mt-4 p-2 border rounded bg-gray-50">
            <p>{status}</p>
          </div>
        )}
      </div>
    </div>
  );
}
