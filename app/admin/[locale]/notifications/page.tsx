// src/app/admin/en/notifications/page.tsx
"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Bell, Filter } from "lucide-react";
import { SAMPLE_NOTIFICATIONS } from "@/constants/admin";
import {
  NotificationActions,
  NotificationCard,
  NotificationFilters,
} from "@/components/admin/notifications";
import { Header } from "@/components/admin/shared";

const NotificationsPage = () => {
  const [notifications, setNotifications] =
    useState<Notification[]>(SAMPLE_NOTIFICATIONS);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<NotificationFilters>({
    type: "",
    priority: "",
    readStatus: "",
    dateRange: { start: null, end: null },
  });
  const [selectedNotifications, setSelectedNotifications] = useState<
    Set<string>
  >(new Set());

  // Filter and search notifications
  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      // Search term filter
      const matchesSearch =
        searchTerm === "" ||
        notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (notification.userName &&
          notification.userName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()));

      // Type filter
      const matchesType = !filters.type || notification.type === filters.type;

      // Priority filter
      const matchesPriority =
        !filters.priority || notification.priority === filters.priority;

      // Read status filter
      const matchesReadStatus =
        !filters.readStatus ||
        (filters.readStatus === "read" && notification.read) ||
        (filters.readStatus === "unread" && !notification.read);

      return (
        matchesSearch && matchesType && matchesPriority && matchesReadStatus
      );
    });
  }, [notifications, searchTerm, filters]);

  // Statistics
  const unreadCount = notifications.filter((n) => !n.read).length;
  const totalCount = notifications.length;

  // Handlers
  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    setSelectedNotifications((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const handleDelete = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
    setSelectedNotifications((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
    setSelectedNotifications(new Set());
  };

  const handleDeleteAll = () => {
    setNotifications((prev) =>
      prev.filter((notification) => !selectedNotifications.has(notification.id))
    );
    setSelectedNotifications(new Set());
  };

  const handleSelectAll = () => {
    setSelectedNotifications(new Set(filteredNotifications.map((n) => n.id)));
  };

  const handleClearSelection = () => {
    setSelectedNotifications(new Set());
  };

  const toggleNotificationSelection = (id: string) => {
    setSelectedNotifications((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="p-6 pb-32 space-y-6 max-h-screen overflow-y-auto bg-gradient-to-br from-gray-50/50 to-blue-50/30 dark:from-gray-900 dark:to-blue-950/20">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Header
          title="Notifications"
          description="Manage and monitor system notifications"
        />

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search notifications..."
              className="pl-10 pr-4 w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <NotificationActions
        selectedCount={selectedNotifications.size}
        unreadCount={unreadCount}
        onMarkAllAsRead={handleMarkAllAsRead}
        onDeleteAll={handleDeleteAll}
        onSelectAll={handleSelectAll}
        onClearSelection={handleClearSelection}
        hasUnread={unreadCount > 0}
      />

      {/* Filters */}
      <NotificationFilters
        filters={filters}
        onFiltersChange={setFilters}
        unreadCount={unreadCount}
        totalCount={totalCount}
      />

      {/* Notifications List */}
      <Card className="shadow-lg">
        <CardHeader className="border-b bg-gradient-to-r from-gray-50 to-blue-50/30">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 bg-primary-color1/10 rounded-lg">
              <Bell className="h-6 w-6 text-primary-color1" />
            </div>
            Notifications ({filteredNotifications.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-4 p-6">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-12">
                <Bell className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600">
                  No notifications found
                </h3>
                <p className="text-gray-500 mt-2">
                  {searchTerm || Object.values(filters).some((f) => f)
                    ? "Try adjusting your search or filters"
                    : "All caught up! No new notifications."}
                </p>
              </div>
            ) : (
              filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start space-x-3"
                >
                  <input
                    type="checkbox"
                    checked={selectedNotifications.has(notification.id)}
                    onChange={() =>
                      toggleNotificationSelection(notification.id)
                    }
                    className="mt-5 h-4 w-4 text-primary-color1 rounded border-gray-300 focus:ring-primary-color1"
                  />
                  <div className="flex-1">
                    <NotificationCard
                      notification={notification}
                      onMarkAsRead={handleMarkAsRead}
                      onDelete={handleDelete}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100">
          <CardTitle className="text-lg">Total</CardTitle>
          <p className="text-3xl font-bold text-blue-600">{totalCount}</p>
        </Card>
        <Card className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100">
          <CardTitle className="text-lg">Unread</CardTitle>
          <p className="text-3xl font-bold text-green-600">{unreadCount}</p>
        </Card>

        <Card className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100">
          <CardTitle className="text-lg">User Activities</CardTitle>
          <p className="text-3xl font-bold text-purple-600">
            {notifications.filter((n) => n.type === "user").length}
          </p>
        </Card>
      </div>
    </div>
  );
};

export default NotificationsPage;
