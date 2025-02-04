"use client";

import { useState, useEffect } from "react";
import {
  AgentKit,
  CdpWalletProvider,
  type WalletProvider,
} from "@coinbase/agentkit";

export default function WalletInfo() {
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [balance, setBalance] = useState<string>("");
  const [networkId, setNetworkId] = useState<string>("");

  useEffect(() => {
    const initWallet = async () => {
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

        const address = await walletProvider.getAddress();
        const balance = await walletProvider.getBalance();

        setWalletAddress(address);
        setBalance(balance.toString());
        setNetworkId(config.networkId);
      } catch (error: unknown) {
        console.error("Failed to initialize wallet:", error);
      }
    };

    initWallet();
  }, []);

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Wallet Information</h2>
      <div className="space-y-2">
        <p>Network: {networkId}</p>
        <p>Address: {walletAddress}</p>
        <p>Balance: {balance} ETH</p>
      </div>
    </div>
  );
}
