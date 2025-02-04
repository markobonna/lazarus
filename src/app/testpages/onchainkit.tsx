"use client";

import { FC } from "react";
import { Avatar } from "@coinbase/onchainkit/identity";
import Link from "next/link";

const OnChainKitTestPage: FC = () => {
  const sampleAddress = "0x1234567890abcdef1234567890abcdef12345678";

  return (
    <div className="p-8">
      <div className="mb-4">
        <Link href="/" className="text-blue-500 hover:text-blue-700 underline">
          Back to Home
        </Link>
      </div>
      <h1 className="text-2xl font-bold mb-4">OnChainKit Component Test</h1>
      <div className="p-4 border rounded">
        <Avatar address={sampleAddress} />
      </div>
    </div>
  );
};

export default OnChainKitTestPage;
