"use client";

import React from "react";
import { Modal, Button, Avatar, Tag, Input } from "antd";
import { UserOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Trash2, AlertTriangle } from "lucide-react";
import { getComplaintConfig } from "@/configs/complaints";

interface DeletePermanentModalProps {
  open: boolean;
  onCancel: () => void;
  chat: BlockedChatType | null;
  onSuccess: (action: string) => void;
}

export const DeletePermanentModal: React.FC<DeletePermanentModalProps> = ({
  open,
  onCancel,
  chat,
  onSuccess,
}) => {
  const [confirmationText, setConfirmationText] = React.useState("");
  const [isConfirmed, setIsConfirmed] = React.useState(false);

  const handleSubmit = async () => {
    if (!isConfirmed) return;

    try {
      console.log("Deleting chat permanently:", {
        chatId: chat?.id,
        chatUsers: `${chat?.complainant.name} & ${chat?.reportedUser.name}`,
      });
      onSuccess("deleted permanently");
      handleClose();
    } catch (error) {
      console.error("Failed to delete chat:", error);
    }
  };

  const handleClose = () => {
    setConfirmationText("");
    setIsConfirmed(false);
    onCancel();
  };

  const handleConfirmationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setConfirmationText(text);
    setIsConfirmed(text === "DELETE PERMANENTLY");
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2.5 pb-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-sm">
            <Trash2 className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            Delete Chat Permanently
          </span>
        </div>
      }
      open={open}
      onCancel={handleClose}
      footer={null}
      width={520}
      centered
      destroyOnClose
    >
      <div className="py-2">
        <div className="space-y-6">
          {/* Main Message */}
          <div className="text-center px-4">
            <p className="font-semibold text-lg leading-tight text-gray-900 dark:text-white">
              Permanently delete chat between{" "}
              <span className="text-red-600 dark:text-red-400 font-bold">
                {chat?.complainant.name}
              </span>{" "}
              and{" "}
              <span className="text-red-600 dark:text-red-400 font-bold">
                {chat?.reportedUser.name}
              </span>
              ?
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 leading-relaxed">
              This will permanently remove all messages, files, and chat
              history. Both users will lose access to this conversation forever.
            </p>
          </div>

          {/* Chat Information */}
          {chat && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="text-center">
                  <Avatar
                    src={chat.complainant.avatar}
                    size={40}
                    icon={<UserOutlined />}
                    className="mx-auto mb-2 border-2 border-blue-200 dark:border-blue-600"
                  />
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {chat.complainant.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Complainant
                  </div>
                </div>
                <div className="text-center">
                  <Avatar
                    src={chat.reportedUser.avatar}
                    size={40}
                    icon={<UserOutlined />}
                    className="mx-auto mb-2 border-2 border-red-200 dark:border-red-600"
                  />
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {chat.reportedUser.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Reported User
                  </div>
                </div>
              </div>
              <div className="text-center text-xs text-gray-600 dark:text-gray-400">
                Chat ID:{" "}
                <span className="font-mono font-semibold text-gray-900 dark:text-white">
                  {chat.id}
                </span>
              </div>
              <div className="text-center text-xs text-gray-600 dark:text-gray-400 mt-1">
                Block Reason:{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {getComplaintConfig(chat.reason).text}
                </span>
              </div>
            </div>
          )}

          {/* Confirmation Field */}
          {/* Enhanced Confirmation Field */}
          <div className="rounded-2xl p-5 border-2 border-red-100 dark:border-red-800/60 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/10 dark:to-red-900/5 shadow-sm">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 dark:bg-red-800/50 flex items-center justify-center">
                <ExclamationCircleOutlined className="text-red-600 dark:text-red-400 text-sm" />
              </div>
              <div>
                <label className="text-sm font-semibold text-red-800 dark:text-red-200 block mb-1">
                  Confirm Permanent Deletion
                </label>
              </div>
            </div>

            <Input
              value={confirmationText}
              onChange={handleConfirmationChange}
              size="large"
              placeholder="Type 'DELETE PERMANENTLY' to confirm"
              className={`
      rounded-lg transition-all duration-300 text-base font-medium
      border-2 focus:shadow-lg focus:scale-[1.02]
      ${
        isConfirmed
          ? "border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-900/20 text-green-900 dark:text-green-100 shadow-green-200/50 dark:shadow-green-800/30"
          : "border-red-200 dark:border-red-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:border-red-300 dark:hover:border-red-600 focus:border-red-400 dark:focus:border-red-500"
      }
    `}
            />

            <div className="flex items-center gap-2 mt-3">
              <div
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  isConfirmed ? "bg-green-500 animate-pulse" : "bg-red-400"
                }`}
              />
              <span
                className={`text-xs font-medium transition-colors duration-300 ${
                  isConfirmed
                    ? "text-green-700 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {isConfirmed
                  ? "✓ Confirmation verified"
                  : "Type exactly 'DELETE PERMANENTLY'"}
              </span>
            </div>
          </div>
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
              disabled={!isConfirmed}
              icon={<Trash2 className="w-4 h-4" />}
              className="min-w-[150px] font-medium shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 dark:from-red-600 dark:to-rose-700 dark:hover:from-red-700 dark:hover:to-rose-800 border-0 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Delete Permanently
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
