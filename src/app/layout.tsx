import { getEvents } from "@/data";
import "@coinbase/onchainkit/styles.css";
import "@/styles/tailwind.css";
import type { Metadata } from "next";
import type React from "react";
import { ApplicationLayout } from "./application-layout";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    template: "%s - LAZARUS",
    default: "LAZARUS",
  },
  description: "AI-Managed Ethereum Rollups",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let events = await getEvents();

  return (
    <html
      lang="en"
      className="text-zinc-950 antialiased lg:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:lg:bg-zinc-950"
    >
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body>
        {" "}
        <Providers>
          <ApplicationLayout events={events}>{children}</ApplicationLayout>{" "}
        </Providers>
      </body>
    </html>
  );
}
