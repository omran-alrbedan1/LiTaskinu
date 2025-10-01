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
    <div className="flex items-center justify-between mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Bell className="h-5 w-5 text-blue-600" />
          <span className="font-semibold">Notifications</span>
          <Badge variant="secondary" className="bg-blue-600 text-white">
            {unreadCount} unread
          </Badge>
        </div>

        {selectedCount > 0 && (
          <Badge variant="default" className="bg-green-600">
            {selectedCount} selected
          </Badge>
        )}
      </div>

      <div className="flex items-center space-x-2">
        {selectedCount > 0 ? (
          <>
            <Button variant="outline" size="sm" onClick={onClearSelection}>
              Clear Selection
            </Button>
            <Button variant="default" size="sm" onClick={onMarkAllAsRead}>
              <CheckCircle className="h-4 w-4 mr-1" />
              Mark as Read
            </Button>
            <Button variant="destructive" size="sm" onClick={onDeleteAll}>
              <Trash2 className="h-4 w-4 mr-1" />
              Delete Selected
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" size="sm" onClick={onSelectAll}>
              Select All
            </Button>
            {hasUnread && (
              <Button variant="default" size="sm" onClick={onMarkAllAsRead}>
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
