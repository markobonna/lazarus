import React, { useState, useEffect } from "react";
import { useAgent } from "@coinbase/agentkit";
import { Server, Shield, Activity } from "lucide-react";
import { Card } from "../../../src/components/ui/card";

const AVSDashboard = () => {
  const { agent } = useAgent();
  const [operators, setOperators] = useState([]);
  const [verificationStats, setVerificationStats] = useState({
    total: 0,
    approved: 0,
    rejected: 0,
    pending: 0,
  });

  // Mock data for demonstration
  useEffect(() => {
    setOperators([
      {
        address: "0x1234...5678",
        status: "active",
        stake: "100,000",
        lastActive: "Just now",
      },
      {
        address: "0x8765...4321",
        status: "active",
        stake: "75,000",
        lastActive: "5m ago",
      },
    ]);

    setVerificationStats({
      total: 156,
      approved: 142,
      rejected: 8,
      pending: 6,
    });
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium text-gray-900">
              Total Verifications
            </h3>
            <Activity className="h-6 w-6 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">
            {verificationStats.total}
          </p>
          <p className="text-sm text-gray-500">
            All-time verifications processed
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium text-gray-900">
              Active Operators
            </h3>
            <Server className="h-6 w-6 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">
            {operators.length}
          </p>
          <p className="text-sm text-gray-500">
            Currently registered operators
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-medium text-gray-900">Success Rate</h3>
            <Shield className="h-6 w-6 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">
            {(
              (verificationStats.approved / verificationStats.total) *
              100
            ).toFixed(1)}
            %
          </p>
          <p className="text-sm text-gray-500">Verification success rate</p>
        </Card>
      </div>

      <Card>
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Active Operators</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Operator Address</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Staked Amount</th>
                  <th className="text-left p-2">Last Active</th>
                </tr>
              </thead>
              <tbody>
                {operators.map((operator, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{operator.address}</td>
                    <td className="p-2">
                      <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-sm">
                        {operator.status}
                      </span>
                    </td>
                    <td className="p-2">{operator.stake} EIG</td>
                    <td className="p-2">{operator.lastActive}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AVSDashboard;
