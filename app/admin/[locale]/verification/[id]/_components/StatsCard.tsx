import React from "react";
import { cn } from "@/lib/utils";

const StatsCard: React.FC<{
  title: string;
  value: number;
  color: string;
  icon: React.ElementType;
}> = ({ title, value, color, icon: Icon }) => (
  <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
    <div className={cn("p-3 rounded-xl", color)}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
        {title}
      </p>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">
        {value}
      </p>
    </div>
  </div>
);

export default StatsCard;
