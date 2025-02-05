"use client";

import Link from "next/link";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

export default function Home() {
  return (
    <div className="space-y-6">
      <Heading level={1}>Welcome to LAZARUS</Heading>
      <Text>
        Create and manage temporary Layer 2 blockchain networks with ease.
      </Text>
      <Link
        href="/testpages/onchainkit"
        className="text-blue-500 hover:text-blue-700 underline"
      >
        Go to OnchainKit Test Page
      </Link>
      <Link
        href="/testpages/agentkit"
        className="text-blue-500 hover:text-blue-700 underline"
      >
        Go to AgentKit Test Page
      </Link>
    </div>
  );
}
