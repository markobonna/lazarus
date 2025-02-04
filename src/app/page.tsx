"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Hackathon Project</h1>
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
    </main>
  );
}
