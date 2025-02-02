"use client";

import { useEffect, useState } from "react";
import { AlertPanel } from "./alert-panel";
import { MetricsPanel } from "./metrics-panel";
import { MonitoringPanel } from "./monitoring-panel";
import type { SecurityMetrics, SecurityAlert } from "@/types/security";
import { SecurityMonitor } from "@/lib/security";

export function SecurityDashboard() {
  const [metrics, setMetrics] = useState<SecurityMetrics | null>(null);
  const [alerts, setAlerts] = useState<SecurityAlert[]>([]);

  useEffect(() => {
    const monitor = SecurityMonitor.getInstance();

    monitor.onAlert((alert) => {
      setAlerts((prev) => [...prev, alert]);
    });

    const updateMetrics = async () => {
      const currentMetrics = await monitor.getMetrics();
      setMetrics(currentMetrics);
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <MetricsPanel metrics={metrics} />
      <AlertPanel alerts={alerts} />
      <MonitoringPanel />
    </div>
  );
}
