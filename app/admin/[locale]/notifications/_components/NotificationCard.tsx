import React from "react";
import { Button } from "@/components/ui/button";
import { Info, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { notificationConfig } from "@/configs/notificationConfigs";
import { formatTimeAgo } from "@/utils/format";

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
  const typeConfig = notificationConfig[notification.type];
  const IconComponent = typeConfig?.icon || Info;
  const timeAgo = formatTimeAgo(notification.timestamp);

  return (
    <div
      className={cn(
        "p-4 rounded-lg border transition-all duration-200 hover:shadow-md"
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          {/* Updated icon display */}
          <div className={cn("p-2 rounded-full", typeConfig?.bgColor)}>
            <IconComponent className={cn("h-4 w-4", typeConfig?.color)} />
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

export default NotificationCard;
