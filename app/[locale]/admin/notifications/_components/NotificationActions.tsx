import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Trash2, Bell, BellOff, Download } from "lucide-react";

interface NotificationActionsProps {
  selectedCount: number;
  unreadCount: number;
  onMarkAllAsRead: () => void;
  onDeleteAll: () => void;
  onSelectAll: () => void;
  onClearSelection: () => void;
  hasUnread: boolean;
}

const NotificationActions: React.FC<NotificationActionsProps> = ({
  selectedCount,
  unreadCount,
  onMarkAllAsRead,
  onDeleteAll,
  onSelectAll,
  onClearSelection,
  hasUnread,
}) => {
  return (
    <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <span className="font-semibold text-gray-900 dark:text-white">
            Notifications
          </span>
          <Badge
            variant="secondary"
            className="bg-blue-600 dark:bg-blue-700 text-white"
          >
            {unreadCount} unread
          </Badge>
        </div>

        {selectedCount > 0 && (
          <Badge
            variant="default"
            className="bg-green-600 dark:bg-green-700 text-white"
          >
            {selectedCount} selected
          </Badge>
        )}
      </div>

      <div className="flex items-center space-x-2">
        {selectedCount > 0 ? (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={onClearSelection}
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Clear Selection
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={onMarkAllAsRead}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Mark as Read
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={onDeleteAll}
              className="bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete Selected
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={onSelectAll}
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Select All
            </Button>
            {hasUnread && (
              <Button
                variant="default"
                size="sm"
                onClick={onMarkAllAsRead}
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Mark All as Read
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NotificationActions;
