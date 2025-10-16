import React from "react";
import { Modal, Button, List, Avatar, Tag } from "antd";
import { CloseOutlined, UserOutlined } from "@ant-design/icons";
import { Trash, Database, MessageSquare, Activity, UserX } from "lucide-react";

interface ParentType {
  parent: {
    avatar?: string;
    name: string;
    relationship: string;
    email?: string;
  };
  member: {
    name: string;
  };
}

interface DeleteModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  selectedParents: ParentType[];
  isBulk?: boolean;
  loading?: boolean;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  open,
  onCancel,
  onConfirm,
  selectedParents,
  isBulk = false,
  loading = false,
}) => {
  const deleteCount = selectedParents.length;

  return (
    <Modal
      title={
        <div className="flex items-center gap-2.5 pb-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-sm">
            <Trash className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            {isBulk ? `Delete ${deleteCount} Parents` : "Delete Parent"}
          </span>
        </div>
      }
      open={open}
      onCancel={onCancel}
      footer={null}
      width={560}
      centered
      destroyOnClose
      closeIcon={<CloseOutlined className="text-gray-500" />}
      className="delete-parents-modal"
    >
      <div className="py-2">
        <div className="space-y-5">
          {/* Centered Icon with Animation */}
          <div className="flex flex-col items-center justify-center py-4">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-red-500 opacity-20 animate-ping"></div>
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg ring-4 ring-red-100 dark:ring-red-900/30">
                <UserX className="w-9 h-9 text-white" />
              </div>
            </div>
          </div>

          {/* Main Message */}
          <div className="text-center px-4">
            <p className="font-semibold text-lg leading-tight text-gray-900 dark:text-white">
              {isBulk ? (
                <>
                  Permanently delete{" "}
                  <span className="text-red-600 font-bold">{deleteCount}</span>{" "}
                  parent{deleteCount > 1 ? "s" : ""}?
                </>
              ) : (
                <>
                  Permanently delete{" "}
                  <span className="text-red-600 font-bold">
                    {selectedParents[0]?.parent.name}
                  </span>
                  's account?
                </>
              )}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 leading-relaxed">
              This is a destructive action that cannot be reversed. All data
              will be permanently erased from our systems.
            </p>
          </div>

          {/* Selected Parents List */}
          {isBulk && selectedParents.length > 0 && (
            <div className="rounded-lg border border-gray-200 dark:border-gray-600 p-4 bg-gray-50 dark:bg-gray-800/50">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-gray-700 dark:text-gray-300 text-sm">
                  Parents selected for deletion
                </span>
                <Tag color="red" className="text-sm px-3 py-1 rounded-lg">
                  {deleteCount} parent{deleteCount > 1 ? "s" : ""}
                </Tag>
              </div>

              <div className="max-h-32 overflow-y-auto">
                <List
                  size="small"
                  dataSource={selectedParents.slice(0, 5)}
                  renderItem={(parent) => (
                    <List.Item className="border-0 !px-1 py-2">
                      <div className="flex items-center gap-3 w-full">
                        <Avatar
                          src={parent.parent.avatar}
                          icon={<UserOutlined />}
                          size="small"
                          className="border border-red-200"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {parent.parent.name}
                          </div>
                          <div className="text-xs text-gray-500 truncate">
                            {parent.parent.relationship} - {parent.member.name}
                          </div>
                        </div>
                      </div>
                    </List.Item>
                  )}
                />
                {selectedParents.length > 5 && (
                  <div className="text-center text-sm text-gray-500 mt-2 pt-2 border-t border-gray-200 dark:border-gray-600">
                    +{selectedParents.length - 5} more parent
                    {selectedParents.length - 5 > 1 ? "s" : ""}
                  </div>
                )}
              </div>
            </div>
          )}

          {!isBulk && selectedParents.length === 1 && (
            <div className="rounded-lg border border-red-200 dark:border-red-800 p-4 bg-red-50 dark:bg-red-900/20">
              <div className="flex items-center gap-3">
                <Avatar
                  src={selectedParents[0].parent.avatar}
                  icon={<UserOutlined />}
                  size="large"
                  className="border border-red-300"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {selectedParents[0].parent.name}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedParents[0].parent.relationship} -{" "}
                    {selectedParents[0].member.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {selectedParents[0].parent.email}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Data to be Deleted */}
          <div className="rounded-lg border border-gray-200 dark:border-gray-600 p-4 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex items-center gap-2 mb-3">
              <Database className="w-4 h-4 text-red-600" />
              <p className="text-red-900 dark:text-red-500 text-sm font-semibold">
                Data to be permanently removed:
              </p>
            </div>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                <div className="w-6 h-6 rounded-md bg-red-50 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Database className="w-3.5 h-3.5 text-red-500" />
                </div>
                <div>
                  <span className="font-medium">Profile & Account Data</span>
                  <p className="text-gray-400 text-xs mt-0.5">
                    Personal information, settings, and preferences
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                <div className="w-6 h-6 rounded-md bg-red-50 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MessageSquare className="w-3.5 h-3.5 text-red-500" />
                </div>
                <div>
                  <span className="font-medium">Messages & Communications</span>
                  <p className="text-gray-400 text-xs mt-0.5">
                    Chat history, notifications, and correspondence
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-700 dark:text-gray-300">
                <div className="w-6 h-6 rounded-md bg-red-50 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Activity className="w-3.5 h-3.5 text-red-500" />
                </div>
                <div>
                  <span className="font-medium">Activity & Logs</span>
                  <p className="text-gray-400 text-xs mt-0.5">
                    Usage history, analytics, and tracking data
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-gray-200 dark:border-gray-500">
          <Button
            onClick={onCancel}
            size="large"
            className="min-w-[110px] font-medium rounded-lg border-gray-300 hover:border-gray-400 dark:border-gray-600"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            danger
            size="large"
            onClick={onConfirm}
            icon={<Trash className="w-4 h-4" />}
            loading={loading}
            className="min-w-[150px] font-medium rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 border-0 shadow-lg hover:shadow-xl transition-shadow"
          >
            {isBulk
              ? `Delete ${deleteCount} Parent${deleteCount > 1 ? "s" : ""}`
              : "Yes, Delete Account"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
