import React from "react";
import { Tag } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

interface VerificationBadgeProps {
  is_verified: number;
}

const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  is_verified,
}) => {
  const getVerificationStatus = (status: number): string => {
    switch (status) {
      case 1:
        return "verified";
      case 0:
        return "unverified";
      case 2:
        return "pending";
      default:
        return "unknown";
    }
  };

  const verificationStatus = getVerificationStatus(is_verified);

  const verificationConfig = {
    verified: {
      color: "green",
      icon: <CheckCircleOutlined />,
      text: "Verified",
    },
    pending: {
      color: "orange",
      icon: <ClockCircleOutlined />,
      text: "Pending",
    },
    unverified: {
      color: "red",
      icon: <CloseCircleOutlined />,
      text: "Unverified",
    },
    unknown: {
      color: "default",
      icon: <CloseCircleOutlined />,
      text: "Unknown",
    },
  };

  const config =
    verificationConfig[verificationStatus as keyof typeof verificationConfig];

  return (
    <Tag
      color={config.color}
      icon={config.icon}
      className="flex items-center gap-1 px-3 py-1 font-medium border-0 rounded-full capitalize"
      style={{ borderRadius: "20px" }}
    >
      {config.text}
    </Tag>
  );
};

export default VerificationBadge;
