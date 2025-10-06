import React from "react";
import { Tag } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

interface VerificationBadgeProps {
  verification: string;
}

const VerificationBadge: React.FC<VerificationBadgeProps> = ({
  verification,
}) => {
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
  };

  const config =
    verificationConfig[verification as keyof typeof verificationConfig];

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
