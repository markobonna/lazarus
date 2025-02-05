"use client";

import { DeFiDashboard } from "@/components/defi/dashboard";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function DeFiAgentDashboardPage() {
  return (
    <main className="container mx-auto p-4 md:p-8 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col space-y-1.5">
            <CardTitle>DeFi Agent Dashboard</CardTitle>
            <p className="text-sm text-muted-foreground">
              Monitor and manage automated DeFi strategies with real-time
              analytics
            </p>
          </div>
        </CardHeader>
      </Card>
      <DeFiDashboard />
    </main>
  );
}
