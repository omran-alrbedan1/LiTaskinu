import React from "react";
import { Card, Button } from "antd";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined,
  CloseCircleOutlined,
  SettingOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

interface NotificationItemProps {
  notification: Notification;
  onDelete: (id: string) => void;
}

const getNotificationIcon = (type: Notification["type"]) => {
  const iconProps = { className: "text-lg" };

  switch (type) {
    case "success":
      return <CheckCircleOutlined {...iconProps} className="text-green-500" />;
    case "warning":
      return (
        <ExclamationCircleOutlined {...iconProps} className="text-yellow-500" />
      );
    case "error":
      return <CloseCircleOutlined {...iconProps} className="text-red-500" />;
    case "system":
      return <SettingOutlined {...iconProps} className="text-blue-500" />;
    default:
      return <InfoCircleOutlined {...iconProps} className="text-blue-400" />;
  }
};

const getTimeAgo = (timestamp: Date) => {
  const now = new Date();
  const diffInMs = now.getTime() - timestamp.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));

  if (diffInMinutes < 60) {
    return `${diffInMinutes} min ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  } else {
    return timestamp.toLocaleDateString();
  }
};

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onDelete,
}) => {
  return (
    <Card className={`mb-3 transition-all duration-200 `} size="small">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <div className="mt-1">{getNotificationIcon(notification.type)}</div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h4
                className={`font-medium mb-1 ${
                  notification.read ? "text-gray-600" : "text-gray-900"
                }`}
              >
                {notification.title}
              </h4>
              <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                {getTimeAgo(notification.timestamp)}
              </span>
            </div>

            <p className="text-sm text-gray-600 mb-2">{notification.message}</p>

            {notification.actionUrl && (
              <a
                href={notification.actionUrl}
                className="text-blue-500 text-sm hover:text-blue-600"
              >
                View details
              </a>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-1 ml-3">
          <Button
            type="text"
            size="small"
            danger
            icon={<DeleteOutlined />}
            onClick={() => onDelete(notification.id)}
            title="Delete notification"
            className="text-gray-400 hover:text-red-500"
          />
        </div>
      </div>
    </Card>
  );
};

export default NotificationItem;
