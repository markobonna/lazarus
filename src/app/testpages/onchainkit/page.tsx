"use client";

import Link from "next/link";
import OnchainCheckout from "@/components/onchainkit/Checkout";

export default function OnChainKitTestPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="mb-4">
        <Link href="/" className="text-blue-500 hover:text-blue-700 underline">
          Back to Home
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">OnchainKit Checkout Demo</h1>
      <OnchainCheckout />
    </div>
  );
}
