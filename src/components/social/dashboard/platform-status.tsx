import { useEffect, useState } from "react";
import { PlatformStatus } from "@/types/social";

export const PlatformStatusDisplay = ({
  platformId,
}: {
  platformId: string;
}) => {
  const [status, setStatus] = useState<PlatformStatus>();

  useEffect(() => {
    // Fetch platform status implementation
  }, [platformId]);

  if (!status) return null;

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
      <p className="text-sm text-gray-600">
        Active Users: {status.users.toLocaleString()}
      </p>
    </div>
  );
};
