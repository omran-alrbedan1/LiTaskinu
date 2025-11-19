import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MOCK_STATISTICS = {
  monthlyTrend: [
    { month: "Jan", complaints: 98, resolved: 75 },
    { month: "Feb", complaints: 112, resolved: 89 },
    { month: "Mar", complaints: 105, resolved: 82 },
    { month: "Apr", complaints: 124, resolved: 98 },
    { month: "May", complaints: 156, resolved: 124 },
    { month: "Jun", complaints: 143, resolved: 115 },
    { month: "Jul", complaints: 167, resolved: 132 },
    { month: "Aug", complaints: 189, resolved: 156 },
    { month: "Sep", complaints: 175, resolved: 142 },
    { month: "Oct", complaints: 198, resolved: 162 },
  ],
};

export const MonthlyTrendChart = () => {
  return (
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="w-5 h-5 text-primary-color1" />
          Monthly Complaint Trend
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={MOCK_STATISTICS.monthlyTrend}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                }}
                formatter={(value, name) => {
                  const label =
                    name === "complaints" ? "Complaints" : "Resolved";
                  return [value, label];
                }}
              />
              <Line
                dataKey="complaints"
                type="monotone"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: "#3b82f6" }}
                name="complaints"
              />
              <Line
                dataKey="resolved"
                type="monotone"
                stroke="#10b981"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: "#10b981" }}
                name="resolved"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Total Complaints
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Resolved
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
