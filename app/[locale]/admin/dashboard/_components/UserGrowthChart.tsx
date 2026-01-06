"use client";

import { TrendingUp, Users } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const chartData = [
  { month: "January", newUsers: 186 },
  { month: "February", newUsers: 305 },
  { month: "March", newUsers: 237 },
  { month: "April", newUsers: 273 },
  { month: "May", newUsers: 309 },
  { month: "June", newUsers: 314 },
  { month: "July", newUsers: 356 },
  { month: "August", newUsers: 389 },
  { month: "September", newUsers: 412 },
  { month: "October", newUsers: 398 },
  { month: "November", newUsers: 445 },
  { month: "December", newUsers: 487 },
];

const UserGrowthChart = () => {
  return (
    <Card className="dark:bg-gray-800 border-0 ">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-500" />
          User Growth
        </CardTitle>
        <CardDescription>Monthly new user registrations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
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
              />
              <Line
                dataKey="newUsers"
                type="monotone"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6, fill: "#3b82f6" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserGrowthChart;
