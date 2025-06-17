import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

interface NewsItem {
  title: string;
  type?: string;
}

interface Props {
  data: NewsItem[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const NewsChart: React.FC<Props> = ({ data }) => {
  const counts: { [type: string]: number } = {};
  data.forEach((item) => {
    const type = item.type || "news";
    counts[type] = (counts[type] || 0) + 1;
  });

  const chartData = Object.entries(counts).map(([type, count]) => ({
    name: type,
    value: count,
  }));

  return (
    <div className="w-full h-96 bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Articles by Type</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            dataKey="value"
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NewsChart;
