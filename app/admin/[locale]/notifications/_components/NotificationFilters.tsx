import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, X, Bell, BellOff, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { notificationConfig } from "@/configs/notificationConfigs";

// Define the type for notification keys based on notificationConfig
type NotificationType = keyof typeof notificationConfig;

interface NotificationFilters {
  type: string;
  readStatus: string;
}

interface NotificationFiltersProps {
  filters: NotificationFilters;
  onFiltersChange: (filters: NotificationFilters) => void;
  unreadCount: number;
  totalCount: number;
}

const NotificationFiltersComponent: React.FC<NotificationFiltersProps> = ({
  filters,
  onFiltersChange,
  unreadCount,
  totalCount,
}) => {
  const handleTypeChange = (type: string) => {
    onFiltersChange({
      ...filters,
      type: type === filters.type ? "" : type,
    });
  };

  const handleReadStatusChange = (status: string) => {
    onFiltersChange({
      ...filters,
      readStatus: status === filters.readStatus ? "" : status,
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      type: "",
      readStatus: "",
    });
  };

  const hasActiveFilters = filters.type || filters.readStatus;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/60 shadow-sm hover:shadow-md transition-all duration-300 p-6 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-primary-color1 rounded-lg">
            <SlidersHorizontal className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900">Filters</h3>
            <p className="text-sm text-gray-500">
              Filter notifications by type and status
            </p>
          </div>
        </div>

        {hasActiveFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearFilters}
            className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
          >
            <X className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>

      {/* Filters Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Type Filter */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Filter className="h-4 w-4 text-primary-color1" />
            Notification Type
          </label>
          <div className="flex flex-wrap gap-2">
            {(
              Object.entries(notificationConfig) as [
                NotificationType,
                (typeof notificationConfig)[NotificationType]
              ][]
            ).map(([key, config]) => (
              <div
                key={key}
                className={cn(
                  "cursor-pointer transition-all duration-200 px-3 py-1 text-sm rounded-full border-2 font-medium",
                  "hover:scale-105 hover:shadow-sm",
                  filters.type === key
                    ? `${config.solidColor} border-transparent text-white shadow-md`
                    : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                )}
                onClick={() => handleTypeChange(key)}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full",
                      filters.type === key ? "bg-white" : config.solidColor
                    )}
                  />
                  {config.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Status Filter */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Bell className="h-4 w-4 text-primary-color1" />
            Notification Status
          </label>
          <div className="flex flex-wrap gap-3">
            <Badge
              variant={filters.readStatus === "unread" ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-all duration-200 px-4 py-2 rounded-lg border-2 font-medium",
                "hover:scale-105 hover:shadow-sm flex items-center gap-2",
                filters.readStatus === "unread"
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-500 shadow-md"
                  : "border-gray-200 text-gray-700 hover:border-amber-200 hover:bg-amber-50"
              )}
              onClick={() => handleReadStatusChange("unread")}
            >
              <div
                className={cn(
                  "w-2 h-2 rounded-full animate-pulse",
                  filters.readStatus === "unread" ? "bg-white" : "bg-amber-500"
                )}
              />
              <Bell className="h-4 w-4" />
              Unread
              <span
                className={cn(
                  "ml-1 px-1.5 py-0.5 rounded-full text-xs",
                  filters.readStatus === "unread"
                    ? "bg-white/20"
                    : "bg-amber-100 text-amber-800"
                )}
              >
                {unreadCount}
              </span>
            </Badge>

            <Badge
              variant={filters.readStatus === "read" ? "default" : "outline"}
              className={cn(
                "cursor-pointer transition-all duration-200 px-4 py-2 rounded-lg border-2 font-medium",
                "hover:scale-105 hover:shadow-sm flex items-center gap-2",
                filters.readStatus === "read"
                  ? "bg-gradient-to-r from-green-500 to-green-600 text-white border-green-500 shadow-md"
                  : "border-gray-200 text-gray-700 hover:border-green-200 hover:bg-green-50"
              )}
              onClick={() => handleReadStatusChange("read")}
            >
              <div
                className={cn(
                  "w-2 h-2 rounded-full",
                  filters.readStatus === "read" ? "bg-white" : "bg-green-500"
                )}
              />
              <BellOff className="h-4 w-4" />
              Read
              <span
                className={cn(
                  "ml-1 px-1.5 py-0.5 rounded-full text-xs",
                  filters.readStatus === "read"
                    ? "bg-white/20"
                    : "bg-green-100 text-green-800"
                )}
              >
                {totalCount - unreadCount}
              </span>
            </Badge>
          </div>
        </div>
      </div>

      {/* Active Filters Indicator */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              Active filters:
              {filters.type && (
                <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-xs font-medium">
                  {notificationConfig[filters.type as NotificationType]?.label}
                </span>
              )}
              {filters.readStatus && (
                <span
                  className={cn(
                    "ml-2 px-2 py-1 rounded-md text-xs font-medium",
                    filters.readStatus === "unread"
                      ? "bg-amber-100 text-amber-800"
                      : "bg-green-100 text-green-800"
                  )}
                >
                  {filters.readStatus === "unread"
                    ? "Unread Only"
                    : "Read Only"}
                </span>
              )}
            </span>

            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs"
            >
              <X className="h-3 w-3 mr-1" />
              Clear
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationFiltersComponent;
