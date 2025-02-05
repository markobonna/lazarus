import { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  change?: number;
}

export const MetricCard = ({ title, value, icon, change }: MetricCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="text-blue-500">{icon}</div>
      </div>
      <div className="flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        {change !== undefined && (
          <span
            className={`ml-2 text-sm ${
              change >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {change >= 0 ? "+" : ""}
            {change}%
          </span>
        )}
      </div>
    </div>
  );
};
