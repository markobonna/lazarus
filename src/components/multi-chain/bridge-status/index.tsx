import {
  BridgeStatus as BridgeStatusType,
  ChainConfig,
  BridgeEvent,
} from "@/types/multi-chain";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle, XCircle, Clock, Activity } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface BridgeStatusProps {
  status: BridgeStatusType;
  chainConfig: ChainConfig;
}

export const BridgeStatus = ({ status, chainConfig }: BridgeStatusProps) => {
  const getEventIcon = (type: BridgeEvent["type"]) => {
    switch (type) {
      case "deposit":
        return <Clock className="h-5 w-5 text-blue-500" />;
      case "withdrawal":
        return <Activity className="h-5 w-5 text-green-500" />;
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Bridge Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span>{chainConfig.name} Bridge Status</span>
            {status.operational ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-red-500" />
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Status</p>
              <p className="font-medium">
                {status.operational ? "Operational" : "Issues Detected"}
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Pending Transactions</p>
              <p className="font-medium">{status.pendingTransactions}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Avg Processing Time</p>
              <p className="font-medium">{status.avgProcessingTime} minutes</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Total Locked Value</p>
              <p className="font-medium">
                {status.totalLocked} {chainConfig.nativeToken}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Bridge Events */}
      {status.recentEvents && status.recentEvents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Bridge Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {status.recentEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    {getEventIcon(event.type)}
                    <div>
                      <p className="font-medium capitalize">{event.type}</p>
                      <p className="text-sm text-gray-600">
                        {formatDistanceToNow(event.timestamp, {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {event.amount} {event.token}
                    </p>
                    <p
                      className={`text-sm ${
                        event.status === "completed"
                          ? "text-green-600"
                          : event.status === "pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {event.status.charAt(0).toUpperCase() +
                        event.status.slice(1)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
