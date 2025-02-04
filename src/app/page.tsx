"use client";

import Link from "next/link";
import { FC } from "react";

const Home: FC = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Hackathon Project</h1>
      <Link
        href="/testpages/onchainkit"
        className="text-blue-500 hover:text-blue-700 underline"
      >
        Go to OnchainKit Test Page
      </Link>
    </main>
  );
};

export default Home;
