import { ChainMetrics } from "@/types/multi-chain";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, ArrowUpDown, BarChart2 } from "lucide-react";

interface MetricsSummaryProps {
  metrics: ChainMetrics;
}

export const MetricsSummary = ({ metrics }: MetricsSummaryProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5 text-blue-500" />
            <span>Performance</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Success Rate</span>
              <span className="font-medium">
                {metrics.performance.successRate}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Avg. Confirmation</span>
              <span className="font-medium">
                {metrics.performance.avgConfirmationTime}s
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart2 className="h-5 w-5 text-green-500" />
            <span>Gas Usage</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Daily Average</span>
              <span className="font-medium">{metrics.gasUsage.daily} Gwei</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Weekly Average</span>
              <span className="font-medium">
                {metrics.gasUsage.weekly} Gwei
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ArrowUpDown className="h-5 w-5 text-purple-500" />
            <span>Transactions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Total</span>
              <span className="font-medium">
                {metrics.performance.totalTransactions}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Success/Fail</span>
              <span className="font-medium">
                {metrics.performance.successRate}/
                {metrics.performance.failureRate}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
