import React from "react";
import { Badge, Tag } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const statusConfig = {
    active: { color: "green", icon: <CheckCircleOutlined />, text: "Active" },
    pending: {
      color: "orange",
      icon: <ClockCircleOutlined />,
      text: "Pending",
    },
    banned: { color: "red", icon: <CloseCircleOutlined />, text: "Banned" },
    inactive: {
      color: "gray",
      icon: <ClockCircleOutlined />,
      text: "Inactive",
    },
  };

  const config = statusConfig[status as keyof typeof statusConfig];

  return (
    <Badge
      status={status as any}
      text={
        <Tag
          color={config.color}
          icon={config.icon}
          className="flex items-center gap-1 px-3 py-1 font-medium border-0 rounded-full"
          style={{ borderRadius: "20px" }}
        >
          {config.text}
        </Tag>
      }
    />
  );
};

export default StatusBadge;
