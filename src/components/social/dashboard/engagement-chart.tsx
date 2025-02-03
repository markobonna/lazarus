import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export const EngagementChart = ({ data }: { data: any[] }) => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="engagement" stroke="#2563eb" />
          <Line type="monotone" dataKey="reach" stroke="#16a34a" />
          <Line type="monotone" dataKey="interactions" stroke="#9333ea" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
