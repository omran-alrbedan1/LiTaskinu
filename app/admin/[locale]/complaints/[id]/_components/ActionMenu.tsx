"use client";
import {
  Ban,
  AlertTriangle,
  MoreVertical,
  Trash2,
  MessageCircle,
} from "lucide-react";
import { Dropdown, Button } from "antd";
import type { MenuProps } from "antd";

interface ActionMenuProps {
  onAction: (action: string) => void;
}

const ActionMenu = ({ onAction }: ActionMenuProps) => {
  const handleMenuClick: MenuProps["onClick"] = (e) => {
    onAction(e.key);
  };

  const menuItems: MenuProps["items"] = [
    {
      key: "ban",
      label: (
        <div className="flex items-center  rounded cursor-pointer ">
          <Ban className="w-4 h-4 mr-2 text-red-600" />
          <span className="font-medium">Ban User</span>
        </div>
      ),
    },
    {
      key: "warn",
      label: (
        <div className="flex items-center  rounded cursor-pointer ">
          <AlertTriangle className="w-4 h-4 mr-2 text-orange-600" />
          <span className="font-medium">Send Warning</span>
        </div>
      ),
    },
    {
      key: "chat",
      label: (
        <div className="flex items-center  rounded cursor-pointer ">
          <MessageCircle className="w-4 h-4 mr-2 text-blue-600" />
          <span className="font-medium">View Full Chat</span>
        </div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "delete",
      label: (
        <div className="flex items-center  rounded cursor-pointer ">
          <Trash2 className="w-4 h-4 mr-2 text-red-600" />
          <span className="font-medium">Delete Complaint</span>
        </div>
      ),
    },
  ];

  return (
    <Dropdown
      menu={{
        items: menuItems,
        onClick: handleMenuClick,
      }}
      trigger={["click"]}
      placement="bottomRight"
    >
      <Button
        type="text"
        icon={<MoreVertical className="w-5 h-5" />}
        className="flex items-center justify-center border border-gray-300 dark:border-gray-500 rounded-lg  w-10 h-10"
      />
    </Dropdown>
  );
};

export default ActionMenu;
