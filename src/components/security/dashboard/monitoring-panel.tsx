import { useState } from "react";
import { Activity, RefreshCw } from "lucide-react";

export function MonitoringPanel() {
  const [isMonitoring, setIsMonitoring] = useState(true);

  const toggleMonitoring = () => {
    setIsMonitoring(!isMonitoring);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Security Monitoring</h2>
        <button
          onClick={toggleMonitoring}
          className={`p-2 rounded-lg ${
            isMonitoring
              ? "bg-green-100 text-green-600"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          <Activity className="h-5 w-5" />
        </button>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <RefreshCw
              className={`h-5 w-5 ${isMonitoring ? "animate-spin" : ""}`}
            />
            <span>Real-time Monitoring</span>
          </div>
          <span className={isMonitoring ? "text-green-600" : "text-gray-600"}>
            {isMonitoring ? "Active" : "Paused"}
          </span>
        </div>
      </div>
    </div>
  );
}
