import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  iconBgColor?: string;
  borderColor?: string;
  description?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  title,
  value,
  iconBgColor = "from-blue-500 to-blue-600",
  borderColor = "border-gray-200 dark:border-gray-700",
  description,
}) => (
  <div
    className={`group relative overflow-hidden py-2 rounded-2xl bg-white dark:bg-gray-800 border-2 ${borderColor} shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 cursor-pointer dark:shadow-gray-900/20`}
  >
    {/* Animated background gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50 dark:to-gray-800/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    {/* Enhanced blur effect for dark mode */}
    <div
      className={`absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br ${iconBgColor} rounded-full blur-3xl opacity-5 dark:opacity-[0.03] group-hover:opacity-15 dark:group-hover:opacity-[0.06] transition-opacity duration-500`}
    />

    <div className="relative p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white group-hover:scale-105 transition-transform duration-300">
              {value}
            </h3>
          </div>
          {description && (
            <p className="text-xs text-red-300 dark:text-gray-500 mt-2">
              {description}
            </p>
          )}
        </div>

        {/* Enhanced icon container */}
        <div
          className={`relative p-3 rounded-xl bg-gradient-to-br ${iconBgColor} shadow-lg group-hover:shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 ring-2 ring-white/10 dark:ring-gray-900/20`}
        >
          <Icon className="h-5 w-5 text-white" />
          <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 dark:group-hover:opacity-10" />
        </div>
      </div>
    </div>
  </div>
);

export default StatCard;
