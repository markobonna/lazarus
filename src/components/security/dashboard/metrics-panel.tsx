import { Activity, Key, Lock, Shield } from "lucide-react";
import type { SecurityMetrics } from "@/types/security";

export function MetricsPanel({ metrics }: { metrics: SecurityMetrics | null }) {
  if (!metrics) return null;

  const cards = [
    {
      title: "Authentication Attempts",
      value: metrics.authAttempts,
      icon: Lock,
      change: "+5%",
    },
    {
      title: "Active Keys",
      value: metrics.activeKeys,
      icon: Key,
      change: "0%",
    },
    {
      title: "Average Key Age",
      value: `${Math.floor(metrics.averageKeyAge / (24 * 60 * 60 * 1000))}d`,
      icon: Activity,
      change: null,
    },
    {
      title: "Failed Attempts",
      value: metrics.failedAttempts,
      icon: Shield,
      change: "-2%",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div key={card.title} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-500">{card.title}</h3>
            <card.icon className="h-5 w-5 text-gray-400" />
          </div>
          <div className="flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">{card.value}</p>
            {card.change && (
              <span
                className={`ml-2 text-sm ${
                  card.change.startsWith("+")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {card.change}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
