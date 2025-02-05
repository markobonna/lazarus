import { Metadata } from "next";
import { MultiChainManager } from "@/components/multi-chain/multi-chain-manager";

export const metadata: Metadata = {
  title: "Multi-chain Management - AMER",
  description: "Manage and monitor multiple blockchain networks",
};

export default function MultiChainPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Multi-chain Management</h1>
        </div>
        <MultiChainManager />
      </div>
    </div>
  );
}
