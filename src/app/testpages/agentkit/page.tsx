"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import WalletInfo from "@/components/agentkit/WalletInfo";
import TokenTransfer from "@/components/agentkit/TokenTransfer";
import BasenameRegistration from "@/components/agentkit/BasenameRegistration";

export default function AgentKitTestPage() {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  return (
    <div className="p-8 space-y-8">
      <div className="mb-4">
        <Link href="/" className="text-blue-500 hover:text-blue-700 underline">
          Back to Home
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-4">AgentKit Features Demo</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button
          className="bg-blue-500 text-white hover:bg-blue-600"
          onClick={() => setActiveComponent("wallet")}
        >
          Check Wallet Info
        </Button>
        <Button
          className="bg-blue-500 text-white hover:bg-blue-600"
          onClick={() => setActiveComponent("transfer")}
        >
          Transfer ETH
        </Button>
        <Button
          className="bg-blue-500 text-white hover:bg-blue-600"
          onClick={() => setActiveComponent("basename")}
        >
          Register Basename
        </Button>
      </div>

      <div className="mt-8">
        {activeComponent === "wallet" && <WalletInfo />}
        {activeComponent === "transfer" && <TokenTransfer />}
        {activeComponent === "basename" && <BasenameRegistration />}
      </div>
    </div>
  );
}
