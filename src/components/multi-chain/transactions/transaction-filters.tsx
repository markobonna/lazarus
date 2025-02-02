// src/components/multi-chain/transactions/transaction-filters.tsx
import { useState } from "react";
import { Filter } from "lucide-react";

interface TransactionFiltersProps {
  onFilterChange: (filters: TransactionFilters) => void;
}

export interface TransactionFilters {
  status?: "success" | "pending" | "failed";
  type?: "transfer" | "bridge" | "contract";
  timeRange?: "1h" | "24h" | "7d" | "30d";
  valueRange?: "all" | "under100" | "100to1000" | "over1000";
}

export const TransactionFilters = ({
  onFilterChange,
}: TransactionFiltersProps) => {
  const [filters, setFilters] = useState<TransactionFilters>({});

  const handleFilterChange = (
    key: keyof TransactionFilters,
    value: string | undefined
  ) => {
    const newFilters = {
      ...filters,
      [key]: value === filters[key] ? undefined : value,
    } as TransactionFilters;
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    setFilters({});
    onFilterChange({});
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="font-medium">Transaction Filters</span>
          </div>
          {Object.keys(filters).length > 0 && (
            <button
              onClick={resetFilters}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Reset Filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select
            className="px-3 py-2 border rounded-md bg-white"
            value={filters.status || ""}
            onChange={(e) =>
              handleFilterChange("status", e.target.value || undefined)
            }
          >
            <option value="">All Status</option>
            <option value="success">Success</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>

          <select
            className="px-3 py-2 border rounded-md bg-white"
            value={filters.type || ""}
            onChange={(e) =>
              handleFilterChange("type", e.target.value || undefined)
            }
          >
            <option value="">All Types</option>
            <option value="transfer">Transfer</option>
            <option value="bridge">Bridge</option>
            <option value="contract">Contract</option>
          </select>

          <select
            className="px-3 py-2 border rounded-md bg-white"
            value={filters.timeRange || ""}
            onChange={(e) =>
              handleFilterChange("timeRange", e.target.value || undefined)
            }
          >
            <option value="">All Time</option>
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>

          <select
            className="px-3 py-2 border rounded-md bg-white"
            value={filters.valueRange || ""}
            onChange={(e) =>
              handleFilterChange("valueRange", e.target.value || undefined)
            }
          >
            <option value="">All Values</option>
            <option value="under100">Under 100</option>
            <option value="100to1000">100 to 1,000</option>
            <option value="over1000">Over 1,000</option>
          </select>
        </div>

        <div className="flex items-center text-sm text-gray-500">
          {Object.keys(filters).length > 0 ? (
            <span>Active Filters: {Object.keys(filters).length}</span>
          ) : (
            <span>No active filters</span>
          )}
        </div>
      </div>
    </div>
  );
};
