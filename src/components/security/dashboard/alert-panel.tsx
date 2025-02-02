import { AlertCircle, Bell, Shield } from "lucide-react";
import type { SecurityAlert } from "@/types/security";

export function AlertPanel({ alerts }: { alerts: SecurityAlert[] }) {
  const getSeverityColor = (severity: SecurityAlert["severity"]) => {
    switch (severity) {
      case "critical":
        return "text-red-600 bg-red-50";
      case "high":
        return "text-orange-600 bg-orange-50";
      case "medium":
        return "text-yellow-600 bg-yellow-50";
      case "low":
        return "text-blue-600 bg-blue-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Security Alerts</h2>
        <Bell className="h-5 w-5 text-gray-400" />
      </div>
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-lg ${getSeverityColor(alert.severity)}`}
          >
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5" />
              <span className="font-medium">{alert.message}</span>
            </div>
            <p className="mt-1 text-sm">
              {new Date(alert.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
        {alerts.length === 0 && (
          <div className="flex items-center justify-center p-6 text-gray-500">
            <Shield className="h-6 w-6 mr-2" />
            <span>No active security alerts</span>
          </div>
        )}
      </div>
    </div>
  );
}
