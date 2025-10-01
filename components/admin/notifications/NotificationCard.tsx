import React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  AlertCircle,
  Info,
  User,
  ShieldAlert,
  Clock,
  ArrowRight,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NOTIFICATION_TYPES } from "@/constants/admin";

interface NotificationCardProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  notification,
  onMarkAsRead,
  onDelete,
}) => {
  const typeConfig = NOTIFICATION_TYPES[notification.type];
  const timeAgo = getTimeAgo(notification.timestamp);

  const getIcon = () => {
    switch (notification.type) {
      case "success":
        return <CheckCircle className="h-5 w-5" />;
      case "error":
        return <AlertCircle className="h-5 w-5" />;
      case "warning":
        return <ShieldAlert className="h-5 w-5" />;
      case "info":
        return <Info className="h-5 w-5" />;
      case "user":
        return <User className="h-5 w-5" />;
      case "system":
        return <Bell className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  return (
    <div
      className={cn(
        "p-4 rounded-lg border transition-all duration-200 hover:shadow-md",
        notification.read ? "bg-white" : "bg-blue-50 border-blue-200",
        typeConfig.bgColor
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <div className={cn("p-2 rounded-full", typeConfig.bgColor)}>
            <div className={typeConfig.color}>{getIcon()}</div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-1">
              <h3
                className={cn(
                  "font-semibold text-sm",
                  notification.read ? "text-gray-700" : "text-gray-900"
                )}
              >
                {notification.title}
              </h3>

              {!notification.read && (
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
              )}
            </div>

            <p className="text-sm text-gray-600 mb-2">{notification.message}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{timeAgo}</span>
                </span>
                {notification.userName && (
                  <span>User: {notification.userName}</span>
                )}
              </div>

              <div className="flex items-center space-x-2">
                {notification.actionUrl && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-xs"
                    asChild
                  >
                    <a href={notification.actionUrl}>
                      View <ArrowRight className="h-3 w-3 ml-1" />
                    </a>
                  </Button>
                )}
                {!notification.read && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-8 text-xs"
                    onClick={() => onMarkAsRead(notification.id)}
                  >
                    Mark Read
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 text-xs text-red-600 hover:text-red-700"
                  onClick={() => onDelete(notification.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function getTimeAgo(timestamp: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor(
    (now.getTime() - timestamp.getTime()) / 1000
  );

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
}

export default NotificationCard;
