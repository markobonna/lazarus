// src/components/multi-chain/multi-chain-manager.tsx
"use client";

import { useState, useEffect } from "react";
import { ChainMetrics, BridgeStatus } from "@/types/multi-chain";
import { chainConfigs } from "@/config/multi-chain";
import { ChainMetricsManager } from "@/lib/multi-chain/chain-metrics";
import { BridgeMonitor } from "@/lib/multi-chain/bridge-monitor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChainOverview } from "./chain-overview";
import { TransactionList } from "./transactions/transaction-list";
import { TransactionFilters } from "./transactions/transaction-filters";
import { NetworkSettings } from "./settings/network-settings";
import { BridgeStatus as BridgeStatusComponent } from "./bridge-status";

export const MultiChainManager = () => {
  const [selectedChain, setSelectedChain] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<Record<string, ChainMetrics>>({});
  const [bridgeStatus, setBridgeStatus] = useState<
    Record<string, BridgeStatus>
  >({});
  const [isLoading, setIsLoading] = useState(true);

  const metricsManager = new ChainMetricsManager();
  const bridgeMonitor = new BridgeMonitor();

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const initialMetrics: Record<string, ChainMetrics> = {};
        const initialBridgeStatus: Record<string, BridgeStatus> = {};

        await Promise.all(
          Object.keys(chainConfigs).map(async (chainId) => {
            const [chainMetrics, chainBridgeStatus] = await Promise.all([
              metricsManager.fetchMetrics(chainId),
              bridgeMonitor.getStatus(chainId),
            ]);

            initialMetrics[chainId] = chainMetrics;
            initialBridgeStatus[chainId] = chainBridgeStatus;
          })
        );

        setMetrics(initialMetrics);
        setBridgeStatus(initialBridgeStatus);

        // Set default selected chain if none selected
        if (!selectedChain && Object.keys(chainConfigs).length > 0) {
          setSelectedChain(Object.keys(chainConfigs)[0]);
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();

    // Set up periodic refresh
    const refreshInterval = setInterval(() => {
      fetchInitialData();
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(refreshInterval);
  }, []);

  const handleChainSelect = (chainId: string) => {
    setSelectedChain(chainId);
  };

  const handleFilterChange = (filters: any) => {
    // Implement transaction filtering logic
    console.log("Applying filters:", filters);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ChainOverview
        chains={chainConfigs}
        selectedChain={selectedChain}
        metrics={metrics}
        onChainSelect={handleChainSelect}
      />

      {selectedChain && (
        <Tabs defaultValue="transactions" className="w-full">
          <TabsList>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="bridges">Bridge Status</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions">
            <div className="space-y-4">
              <TransactionFilters onFilterChange={handleFilterChange} />
              <TransactionList
                transactions={metrics[selectedChain]?.transactions || []}
                chainName={chainConfigs[selectedChain].name}
              />
            </div>
          </TabsContent>

          <TabsContent value="bridges">
            <BridgeStatusComponent
              status={bridgeStatus[selectedChain]}
              chainConfig={chainConfigs[selectedChain]}
            />
          </TabsContent>

          <TabsContent value="settings">
            <NetworkSettings
              chainId={selectedChain}
              chainConfig={chainConfigs[selectedChain]}
            />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};
