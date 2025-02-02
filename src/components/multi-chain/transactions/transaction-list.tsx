import { Transaction } from "@/types/multi-chain";
import { formatDistanceToNow } from "date-fns";
import { ExternalLink, CheckCircle, XCircle, Clock } from "lucide-react";

interface TransactionListProps {
  transactions: Transaction[];
  chainName: string;
}

export const TransactionList = ({
  transactions,
  chainName,
}: TransactionListProps) => {
  const getStatusIcon = (status: Transaction["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "failed":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getExplorerLink = (hash: string) => {
    // This would be configured per chain in production
    return `https://explorer.chain.example/${hash}`;
  };

  return (
    <div className="space-y-4">
      {transactions.map((tx) => (
        <div
          key={tx.id}
          className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
        >
          <div className="flex items-center space-x-4">
            {getStatusIcon(tx.status)}
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-sm">
                  {tx.hash.slice(0, 6)}...{tx.hash.slice(-4)}
                </span>
                <a
                  href={getExplorerLink(tx.hash)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              <p className="text-sm text-gray-600">
                {formatDistanceToNow(tx.timestamp, { addSuffix: true })}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium">
              {tx.value} {chainName}
            </p>
            <p className="text-sm text-gray-600">Gas: {tx.gasUsed}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
