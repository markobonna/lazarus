"use client";

import { OnchainKitProvider } from "@coinbase/onchainkit";
import { baseSepolia } from "viem/chains";
import type { ReactNode } from "react";

export function Providers(props: { children: ReactNode }) {
  return (
    <OnchainKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={baseSepolia} // Using Base Sepolia testnet
    >
      {props.children}
    </OnchainKitProvider>
  );
}
