"use client";

import { useState } from "react";
import { AgentKit, CdpWalletProvider } from "@coinbase/agentkit";
import { Button } from "@/components/ui/button";

export default function BasenameRegistration() {
  const [basename, setBasename] = useState("");
  const [status, setStatus] = useState("");

  const handleRegistration = async () => {
    try {
      const config = {
        apiKeyName: process.env.CDP_API_KEY_NAME!,
        apiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY!,
        networkId: process.env.NETWORK_ID || "base-sepolia",
      };

      const walletProvider = await CdpWalletProvider.configureWithWallet(
        config
      );
      const agentkit = await AgentKit.from({ walletProvider });

      setStatus("Checking basename availability...");

      // First check if the basename is available
      const isAvailable = await agentkit.isBasenameAvailable(basename);

      if (!isAvailable) {
        setStatus("Basename is already taken");
        return;
      }

      setStatus("Registering basename...");

      const tx = await agentkit.registerBasename(basename);
      setStatus(`Registration successful! TX: ${tx.hash}`);
    } catch (error) {
      console.error("Registration failed:", error);
      setStatus(`Registration failed: ${error.message}`);
    }
  };

  return (
    <div className="p-4 border rounded-lg space-y-4">
      <h2 className="text-xl font-semibold mb-4">Register Basename</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Enter desired basename"
          className="w-full p-2 border rounded"
          value={basename}
          onChange={(e) => setBasename(e.target.value)}
        />
        <Button
          className="w-full bg-blue-500 text-white hover:bg-blue-600"
          onClick={handleRegistration}
        >
          Register Basename
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
