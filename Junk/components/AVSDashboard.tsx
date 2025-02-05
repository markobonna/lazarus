import React, { useState, useEffect } from "react";
import { useAgent } from "@coinbase/agentkit";
import { AVSClient } from "../avs/client";
import { defaultAVSConfig } from "../avs/config";
import { ethers } from "ethers";
import { Server, Shield, Activity } from "lucide-react";

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
        <StatsCard
          title="Total Verifications"
          value={verificationStats.total}
          icon={<Activity className="h-6 w-6" />}
          description="All-time verifications processed"
        />
        <StatsCard
          title="Active Operators"
          value={operators.length}
          icon={<Server className="h-6 w-6" />}
          description="Currently registered operators"
        />
        <StatsCard
          title="Success Rate"
          value={`${(
            (verificationStats.approved / verificationStats.total) *
            100
          ).toFixed(1)}%`}
          icon={<Shield className="h-6 w-6" />}
          description="Verification success rate"
        />
      </div>

      <div className="bg-white rounded-lg shadow">
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
      </div>
    </div>
  );
};

const StatsCard = ({ title, value, icon, description }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <div className="text-blue-500">{icon}</div>
    </div>
    <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
    <p className="text-sm text-gray-500">{description}</p>
  </div>
);

export default AVSDashboard;
