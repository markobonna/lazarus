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

interface NFTError {
  message: string;
}

interface NFTMetadata {
  name: string;
  description: string;
  image: string;
}

export default function NFTManagement() {
  const [contractAddress, setContractAddress] = useState<string>("");
  const [tokenId, setTokenId] = useState<string>("");
  const [metadata, setMetadata] = useState<NFTMetadata | null>(null);
  const [status, setStatus] = useState<string>("");

  const fetchNFTMetadata = async () => {
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

      setStatus("Fetching NFT metadata...");

      // Fetch NFT metadata using the contract address and token ID
      const nftData = await agentkit.getNFTMetadata(contractAddress, tokenId);
      setMetadata(nftData);
      setStatus("Metadata fetched successfully!");
    } catch (error: unknown) {
      const err = error as NFTError;
      console.error("Failed to fetch NFT:", err);
      setStatus(`Error: ${err.message}`);
    }
  };

  return (
    <div className="p-4 border rounded-lg space-y-4">
      <h2 className="text-xl font-semibold mb-4">NFT Management</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="NFT Contract Address"
          className="w-full p-2 border rounded"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Token ID"
          className="w-full p-2 border rounded"
          value={tokenId}
          onChange={(e) => setTokenId(e.target.value)}
        />
        <Button
          className="w-full bg-blue-500 text-white hover:bg-blue-600"
          onClick={fetchNFTMetadata}
        >
          Fetch NFT Data
        </Button>
        {status && (
          <div className="mt-4 p-2 border rounded bg-gray-50">
            <p>{status}</p>
          </div>
        )}
        {metadata && (
          <div className="mt-4 p-4 border rounded">
            <h3 className="font-semibold">NFT Details:</h3>
            <p>Name: {metadata.name}</p>
            <p>Description: {metadata.description}</p>
            {metadata.image && (
              <img
                src={metadata.image}
                alt={metadata.name}
                className="mt-2 max-w-xs rounded"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
