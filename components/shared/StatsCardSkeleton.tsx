import React from "react";
import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton"; // Using shadcn Skeleton instead of Antd

type Props = {};

const StatsCardSkeleton = (props: Props) => {
  return (
    <div className="group relative overflow-hidden py-2 rounded-2xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 shadow-sm cursor-pointer dark:shadow-gray-900/20">
      {/* Animated background gradient skeleton */}

      {/* Blur effect skeleton */}

      <div className="relative p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {/* Title skeleton */}
            <Skeleton className="h-4 w-20 mb-1 bg-gray-200 dark:bg-gray-600" />

            {/* Value skeleton */}
            <div className="flex items-baseline gap-2">
              <Skeleton className="h-8 w-12 bg-gray-200 dark:bg-gray-500" />
            </div>

            {/* Description skeleton */}
            <Skeleton className="h-3 w-24 mt-2 bg-gray-200 dark:bg-gray-700" />
          </div>

          {/* Icon container skeleton */}
          <div className="relative p-3 rounded-xl bg-gray-200 dark:bg-gray-600 ring-2 ring-white/10 dark:ring-gray-900/20">
            <Skeleton className="h-5 w-5 rounded-full bg-gray-300 dark:bg-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCardSkeleton;
