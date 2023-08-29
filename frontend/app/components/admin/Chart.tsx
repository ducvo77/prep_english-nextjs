"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
interface ChartProps {
  totalUser: number;
  totalTests: number;
  totalTestHistory: number;
  totalBlog: number;
}

export default function Chart({
  totalTests,
  totalTestHistory,
  totalBlog,
  totalUser,
}: ChartProps) {
  const data = [
    {
      name: "User",
      total: totalUser,
    },
    {
      name: "Test",
      total: totalTests,
    },
    {
      name: "Test Done",
      total: totalTestHistory,
    },
    {
      name: "Blog",
      total: totalBlog,
    },
  ];
  return (
    <div className="bg-[#fff] p-6 w-full h-[400px] rounded-lg">
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
