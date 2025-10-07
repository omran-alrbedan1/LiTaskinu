import React from "react";
import { Space } from "antd";
import {
  HeartOutlined,
  MessageOutlined,
  FlagOutlined,
} from "@ant-design/icons";

interface ActivityStatsProps {
  user: User;
}

const ActivityStats: React.FC<ActivityStatsProps> = ({ user }) => {
  return (
    <Space size={8} wrap>
      {/* Marriage Requests */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 dark:bg-red-900/20 rounded-full border border-red-200 dark:border-red-800">
        <HeartOutlined className="text-red-600 dark:text-red-400 text-xs" />
        <span className="text-sm font-semibold text-red-700 dark:text-red-300">
          {user.marriageRequests}
        </span>
        <span className="text-xs text-red-600 dark:text-red-400 font-medium">
          Requests
        </span>
      </div>

      {/* Active Chats */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-200 dark:border-blue-800">
        <MessageOutlined className="text-blue-600 dark:text-blue-400 text-xs" />
        <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
          {user.activeChats}
        </span>
        <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
          Chats
        </span>
      </div>

      {/* Reports Count */}
      {user.reportsCount > 0 && (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 dark:bg-orange-900/20 rounded-full border border-orange-200 dark:border-orange-800">
          <FlagOutlined className="text-orange-600 dark:text-orange-400 text-xs" />
          <span className="text-sm font-semibold text-orange-700 dark:text-orange-300">
            {user.reportsCount}
          </span>
          <span className="text-xs text-orange-600 dark:text-orange-400 font-medium">
            Reports
          </span>
        </div>
      )}
    </Space>
  );
};

export default ActivityStats;
