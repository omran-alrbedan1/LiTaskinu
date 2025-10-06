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
      <div className="flex items-center gap-2 px-3 py-1.5 bg-red-50 rounded-full border border-red-200">
        <HeartOutlined className="text-red-600 text-xs" />
        <span className="text-sm font-semibold text-red-700">
          {user.marriageRequests}
        </span>
        <span className="text-xs text-red-600 font-medium">Requests</span>
      </div>

      <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-full border border-blue-200">
        <MessageOutlined className="text-blue-600 text-xs" />
        <span className="text-sm font-semibold text-blue-700">
          {user.activeChats}
        </span>
        <span className="text-xs text-blue-600 font-medium">Chats</span>
      </div>

      {user.reportsCount > 0 && (
        <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 rounded-full border border-orange-200">
          <FlagOutlined className="text-orange-600 text-xs" />
          <span className="text-sm font-semibold text-orange-700">
            {user.reportsCount}
          </span>
          <span className="text-xs text-orange-600 font-medium">Reports</span>
        </div>
      )}
    </Space>
  );
};

export default ActivityStats;
