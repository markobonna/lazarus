"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import OnchainCheckout from "@/components/onchainkit/Checkout";
import { useState } from "react";

export default function OnChainKitTestPage() {
  const [showCheckout, setShowCheckout] = useState(false);

  return (
    <div className="p-8 space-y-8">
      <div className="mb-4">
        <Link href="/" className="text-blue-500 hover:text-blue-700 underline">
          Back to Home
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">OnchainKit Checkout Demo</h1>

      {showCheckout ? (
        <OnchainCheckout />
      ) : (
        <Button
          className="bg-blue-500 text-white hover:bg-blue-600"
          onClick={() => setShowCheckout(true)}
        >
          Open Checkout
        </Button>
      )}
    </div>
  );
}
