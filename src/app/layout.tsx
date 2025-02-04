import "./global.css";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { OnchainProviders } from "./onchain-providers";
import { DeFiProvider } from "./defi-providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hackathon Project",
  description: "AI-Managed Ethereum Rollups",
};

// Create a client
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <OnchainProviders>{children}</OnchainProviders>
      </body>
    </html>
  );
}
