import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  iconBgColor?: string;
  borderColor?: string;
}

export const StatCard = ({
  title,
  value,
  icon: Icon,
  description,
  iconBgColor = "from-blue-500 to-blue-600",
  borderColor = "border-gray-200 dark:border-gray-700",
}: StatCardProps) => (
  <Card
    className={cn(
      "group relative overflow-hidden bg-white dark:bg-gray-800 border-2 transition-all duration-500 hover:-translate-y-1 cursor-pointer",
      borderColor,
      "shadow-sm hover:shadow-xl dark:shadow-gray-900/20"
    )}
  >
    {/* Subtle background effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50 dark:to-gray-800/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    {/* Soft glow effect */}
    <div
      className={cn(
        "absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br rounded-full blur-xl opacity-5 dark:opacity-10 group-hover:opacity-20 transition-opacity duration-500",
        iconBgColor
      )}
    />

    <CardContent className="relative p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
            {title}
          </p>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 group-hover:scale-105 transition-transform duration-300 inline-block">
            {value}
          </h3>
          {description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {description}
            </p>
          )}
        </div>

        {/* Beautiful icon container */}
        <div
          className={cn(
            "relative p-3 rounded-xl bg-gradient-to-br shadow-lg transition-all duration-500",
            "group-hover:shadow-xl group-hover:scale-110 group-hover:rotate-3",
            "ring-2 ring-white/20 dark:ring-gray-900/30",
            iconBgColor
          )}
        >
          <Icon className="h-6 w-6 text-white" />
          {/* Subtle shine effect */}
          <div className="absolute inset-0 rounded-xl bg-white/0 group-hover:bg-white/20 transition-all duration-300" />
        </div>
      </div>
    </CardContent>
  </Card>
);
