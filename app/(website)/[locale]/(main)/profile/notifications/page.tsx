"use client";
import { useState } from "react";
import { Card, Divider, Modal } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { mockNotifications } from "@/constants/temporary";
import NotificationItem from "../_components/NotificationItem";
import { images } from "@/constants/images";
import Image from "next/image";
import CustomHeader from "@/components/shared/CustomHeader";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const groupNotificationsByDate = (notifs: Notification[]) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const groups = {
      today: [] as Notification[],
      yesterday: [] as Notification[],
      older: [] as Notification[],
    };

    notifs.forEach((notification) => {
      const notifDate = new Date(notification.timestamp);
      notifDate.setHours(0, 0, 0, 0);

      if (notifDate.getTime() === today.getTime()) {
        groups.today.push(notification);
      } else if (notifDate.getTime() === yesterday.getTime()) {
        groups.yesterday.push(notification);
      } else {
        groups.older.push(notification);
      }
    });

    return groups;
  };
  //@ts-ignore
  const { today, yesterday, older } = groupNotificationsByDate(notifications);

  const handleDeleteNotification = (id: string) => {
    Modal.confirm({
      title: "Delete Notification",
      content: "Are you sure you want to delete this notification?",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        setNotifications(notifications.filter((n) => n.id !== id));
      },
    });
  };

  const renderNotificationGroup = (
    notifications: Notification[],
    title: string
  ) => {
    if (notifications.length === 0) return null;

    return (
      <div className="mb-6">
        <Divider orientation="left" className="text-gray-500 font-medium">
          {title}
        </Divider>
        <div className="space-y-2 max-h-96 pb-10 hide-scrollbar overflow-y-scroll">
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onDelete={handleDeleteNotification}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CustomHeader
        title="Notifications"
        description="Manage your notifications and stay updated"
      />

      <div className="max-w-4xl mx-auto px-4 py-6">
        <Card>
          {/* Header Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="flex items-center space-x-2">
              <BellOutlined className="text-primary-color1 text-xl" />
              <span className="text-lg font-semibold">
                Notifications ({notifications.length})
              </span>
            </div>
          </div>

          {/* Notifications List */}
          <div className="">
            {notifications.length === 0 ? (
              <div className="w-full flex flex-col justify-center items-center">
                <Image
                  src={images.notifications}
                  height={184}
                  width={184}
                  alt="notification"
                  className="mx-auto"
                />
                <h3 className="text-2xl font-bold text-primary-color1 mb-2">
                  No notification yet!
                </h3>
                <p className="text-gray-500">
                  We will notify you once we have something for you{" "}
                </p>
              </div>
            ) : (
              <>
                {renderNotificationGroup(today, "Today")}
                {renderNotificationGroup(yesterday, "Yesterday")}
                {renderNotificationGroup(older, "Older")}
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NotificationsPage;
