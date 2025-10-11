import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3 } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const MOCK_STATISTICS = {
  byType: [
    {
      type: "Harassment",
      count: 456,
      trend: "up" as const,
      percentage: 36.6,
      color: "#ef4444",
    },
    {
      type: "Fake Profile",
      count: 289,
      trend: "down" as const,
      percentage: 23.2,
      color: "#f59e0b",
    },
    {
      type: "Inappropriate Content",
      count: 198,
      trend: "up" as const,
      percentage: 15.9,
      color: "#8b5cf6",
    },
    {
      type: "Spam",
      count: 156,
      trend: "stable" as const,
      percentage: 12.5,
      color: "#06b6d4",
    },
    {
      type: "Other",
      count: 148,
      trend: "stable" as const,
      percentage: 11.9,
      color: "#10b981",
    },
  ],
};

export const ComplaintTypeRadial = () => {
  return (
    <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <BarChart3 className="w-5 h-5 text-primary-color1" />
          Complaints by Type
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Radial Chart */}
          <div className="flex justify-center">
            <div className="h-64 w-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={MOCK_STATISTICS.byType}
                    dataKey="count"
                    nameKey="type"
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                  >
                    {MOCK_STATISTICS.byType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [`${value} complaints`, name]}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e2e8f0",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-8">
            {MOCK_STATISTICS.byType.map((item, index) => (
              <div
                key={item.type}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {item.type}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {item.count}
                  </Badge>
                  <span className="text-xs text-gray-500 w-12 text-right">
                    {item.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
