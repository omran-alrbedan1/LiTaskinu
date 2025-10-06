import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  iconBgColor?: string;
  borderColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  title,
  value,
  iconBgColor = "from-blue-500 to-blue-600",
  borderColor = "border-blue-200",
}) => (
  <div
    className={`group relative overflow-hidden rounded-2xl bg-white border-2 ${borderColor} shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer`}
  >
    {/* Animated gradient background on hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    {/* Decorative blur effect */}
    <div
      className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${iconBgColor} rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
    />

    <div className="relative p-6">
      {/* Header with icon */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 mb-1 group-hover:text-gray-700 transition-colors duration-300">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-gray-900 group-hover:scale-105 transition-transform duration-300">
              {value}
            </h3>
          </div>
        </div>

        {/* Floating icon with gradient */}
        <div
          className={`relative p-3 rounded-xl bg-gradient-to-br ${iconBgColor} shadow-lg group-hover:shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
        >
          <Icon className="h-5 w-5 text-white" />
          <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
        </div>
      </div>
    </div>
  </div>
);

export default StatCard;
