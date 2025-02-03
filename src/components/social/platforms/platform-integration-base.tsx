import { useEffect, useState } from "react";
import { PlatformStatus, PlatformConfig } from "@/types/social";

interface PlatformIntegrationProps {
  config: PlatformConfig;
  onStatusChange: (status: PlatformStatus) => void;
}

export const PlatformIntegrationBase = ({
  config,
  onStatusChange,
}: PlatformIntegrationProps) => {
  const [status, setStatus] = useState<PlatformStatus>({
    id: config.id,
    name: config.name,
    status: "inactive",
    users: 0,
    lastSync: new Date().toISOString(),
    errorCount: 0,
  });

  useEffect(() => {
    const initialize = async () => {
      try {
        // Validate configuration
        if (!config.apiKey) {
          throw new Error("API key not configured");
        }

        // Set up webhook if needed
        if (config.webhookUrl) {
          await setupWebhook(config.webhookUrl);
        }

        // Update status
        const newStatus = {
          ...status,
          status: "active",
          users: await fetchUserCount(),
          lastSync: new Date().toISOString(),
          errorCount: 0,
        };

        setStatus(newStatus);
        onStatusChange(newStatus);
      } catch (error) {
        console.error(`${config.name} integration failed:`, error);
        const newStatus = {
          ...status,
          status: "inactive",
          errorCount: status.errorCount + 1,
          lastSync: new Date().toISOString(),
        };
        setStatus(newStatus);
        onStatusChange(newStatus);
      }
    };

    initialize();
    const interval = setInterval(initialize, 5 * 60 * 1000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, [config]);

  const setupWebhook = async (url: string): Promise<void> => {
    // Implementation would depend on platform
    return Promise.resolve();
  };

  const fetchUserCount = async (): Promise<number> => {
    // Implementation would depend on platform
    return Promise.resolve(Math.floor(Math.random() * 1000) + 500);
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium">{status.name}</h3>
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            status.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {status.status.toUpperCase()}
        </span>
      </div>
      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          Active Users: {status.users.toLocaleString()}
        </p>
        <p className="text-sm text-gray-600">
          Last Sync: {new Date(status.lastSync).toLocaleTimeString()}
        </p>
        {status.errorCount > 0 && (
          <p className="text-sm text-red-600">Errors: {status.errorCount}</p>
        )}
      </div>
    </div>
  );
};
