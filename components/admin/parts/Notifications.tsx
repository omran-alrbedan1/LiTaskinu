import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Bell, Check, ChevronRight, BellRing } from "lucide-react";
import TooltipButton from "./TooltipButton";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { mockNotifications } from "@/constants/temporary";
import { formatTimeAgo } from "@/utils/format";
import { notificationConfig } from "@/configs/notificationConfigs";

export default function Notifications() {
  const unreadCount = mockNotifications.filter(
    (notification) => !notification.read
  ).length;

  const handleNotificationClick = (notificationId: string) => {
    console.log("Notification clicked:", notificationId);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div>
          <TooltipButton
            variant="ghost"
            size="icon"
            className="relative hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-200"
            tooltipContent="Notifications"
          >
            <div className="relative">
              <Bell className="!h-5 !w-5 text-primary-color1" />
              {unreadCount > 0 && (
                <>
                  <span className="absolute -top-3 -right-2 flex h-5 w-5">
                    <span className="relative inline-flex rounded-full h-5 w-5 bg-gradient-to-br from-red-500 to-red-600 text-[10px] font-bold text-white items-center justify-center shadow-lg">
                      {unreadCount}
                    </span>
                  </span>
                </>
              )}
            </div>
          </TooltipButton>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-96 p-0 shadow-xl border-0 ring-1 ring-gray-200/50 dark:ring-gray-700/50 dark:border-gray-700"
        align="end"
      >
        <div className="flex flex-col max-h-[32rem] bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50 rounded-lg overflow-hidden">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-primary/5 via-primary/3 to-transparent dark:from-primary/10 dark:via-primary/5 p-5 border-b border-gray-200/50 dark:border-gray-700/50">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl">
                  <BellRing className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                    Notifications
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {unreadCount > 0
                      ? `${unreadCount} unread notifications`
                      : "All caught up"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto sidebar-scrollbar">
            {mockNotifications.length > 0 ? (
              <div className="p-2 space-y-1.5">
                {mockNotifications.map((notification) => {
                  const config =
                    notificationConfig[
                      notification.type as keyof typeof notificationConfig
                    ] || notificationConfig.info;
                  const IconComponent = config.icon;

                  return (
                    <div
                      key={notification.id}
                      className={`group relative rounded-xl p-3.5 cursor-pointer transition-all duration-200`}
                      onClick={() => handleNotificationClick(notification.id)}
                    >
                      {/* Unread indicator line */}
                      {!notification.read && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-500 dark:from-blue-400 dark:to-indigo-400 rounded-r-full"></div>
                      )}

                      <div className="flex items-start gap-3 ml-1">
                        {/* Icon with gradient background */}
                        <div
                          className={`relative p-2.5 rounded-xl  ${config.color} ring-gray-200 dark:ring-gray-700  ring-2 shadow-sm group-hover:scale-110 transition-transform duration-200`}
                        >
                          <IconComponent
                            className="h-4 w-4"
                            strokeWidth={2.5}
                          />
                          {!notification.read && (
                            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500 ring-2 ring-white dark:ring-gray-900"></span>
                            </span>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4
                              className={`font-semibold text-sm leading-tight ${
                                !notification.read
                                  ? "text-gray-900 dark:text-white"
                                  : "text-gray-600 dark:text-gray-300"
                              }`}
                            >
                              {notification.title}
                            </h4>
                            <ChevronRight className="h-4 w-4 text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-400 group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0" />
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1.5 line-clamp-2 leading-relaxed">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                              {formatTimeAgo(notification.timestamp)}
                            </span>
                            <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500 capitalize">
                              {notification.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-full blur-xl opacity-50"></div>
                  <div className="relative p-4 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl">
                    <Bell className="h-10 w-10 text-gray-300 dark:text-gray-600" />
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-white mt-4">
                  All caught up!
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  No new notifications
                </p>
              </div>
            )}
          </div>

          {/* Footer with View All Link */}
          <div className="border-t border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-b from-transparent to-gray-50/50 dark:to-gray-800/30 p-3">
            <Link
              href="./notifications"
              className="flex items-center justify-center gap-2 text-sm text-primary-color1 hover:text-primary-color2 font-semibold transition-all duration-200 py-2 px-4 rounded-lg hover:bg-primary/5 dark:hover:bg-primary/10 group"
            >
              View all notifications
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
