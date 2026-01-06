"use client";

import React from "react";
import { Modal, Button, Avatar, Tag } from "antd";
import { UserOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { Unlock } from "lucide-react";
import { getComplaintConfig } from "@/configs/complaints";

interface UserType {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface UnblockModalProps {
  open: boolean;
  onCancel: () => void;
  chat: BlockedChatType | null;
  onSuccess: (action: string) => void;
}

export const UnblockModal: React.FC<UnblockModalProps> = ({
  open,
  onCancel,
  chat,
  onSuccess,
}) => {
  const handleSubmit = async () => {
    try {
      console.log("Unblocking user:", {
        userId: chat?.reportedUser.id,
        userName: chat?.reportedUser.name,
      });
      onSuccess("unblocked");
      handleClose();
    } catch (error) {
      console.error("Failed to unblock user:", error);
    }
  };

  const handleClose = () => {
    onCancel();
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2.5 pb-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-sm">
            <Unlock className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            Unblock User
          </span>
        </div>
      }
      open={open}
      onCancel={handleClose}
      footer={null}
      width={500}
      centered
      destroyOnClose
    >
      <div className="py-2">
        <div className="space-y-6">
          {/* Main Message */}
          <div className="text-center px-4">
            <p className="font-semibold text-lg leading-tight text-gray-900 dark:text-white">
              Restore access for{" "}
              <span className="text-primary-color1 font-bold dark:text-blue-400">
                {chat?.reportedUser.name}
              </span>
              ?
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 leading-relaxed">
              This action will remove the block and allow the user to access the
              platform again.
            </p>
          </div>

          {/* User Information - Only Reported User */}
          {chat && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-4">
                <Avatar
                  src={chat.reportedUser.avatar}
                  size={64}
                  icon={<UserOutlined />}
                  className="border-2 border-red-300 dark:border-red-600"
                />
                <div className="flex-1">
                  <div className="text-lg font-bold text-gray-900 dark:text-white">
                    {chat.reportedUser.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {chat.reportedUser.email}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Tag
                      color="red"
                      className="text-xs dark:bg-red-900/30 dark:border-red-800 dark:text-red-200"
                    >
                      Blocked User
                    </Tag>
                    <Tag
                      color="orange"
                      className="text-xs dark:bg-orange-900/30 dark:border-orange-800 dark:text-orange-200"
                    >
                      {chat.blockDuration}
                    </Tag>
                  </div>
                </div>
              </div>

              {/* Block Details */}
              <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-gray-600 dark:text-gray-400 font-medium">
                      Block Reason
                    </div>
                    <div className="font-semibold mt-1 text-gray-900 dark:text-white">
                      {getComplaintConfig(chat.reason).text}
                    </div>
                  </div>
                  <div>
                    <div className="text-gray-600 dark:text-gray-400 font-medium">
                      Expiry Date
                    </div>
                    <div className="font-semibold mt-1 text-gray-900 dark:text-white">
                      {chat.blockExpiry}
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="text-gray-600 dark:text-gray-400 font-medium">
                    Blocked By
                  </div>
                  <div className="font-semibold mt-1 text-gray-900 dark:text-white">
                    {chat.blockedBy}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              onClick={handleClose}
              size="large"
              className="min-w-[110px] font-medium bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              size="large"
              onClick={handleSubmit}
              icon={<Unlock className="w-4 h-4" />}
              className="min-w-[130px] font-medium shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 dark:from-green-600 dark:to-emerald-700 dark:hover:from-green-700 dark:hover:to-emerald-800 border-0 text-white"
            >
              Unblock User
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
