import React from "react";
import { Modal, Button } from "antd";
import { UnlockOutlined, CheckCircleOutlined } from "@ant-design/icons";

interface UnbanModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  userName: string;
  confirmButtonColor?: string; // Parameter for button color
}

const UnbanModal: React.FC<UnbanModalProps> = ({
  open,
  onCancel,
  onConfirm,
  userName,
  confirmButtonColor = "primary",
}) => {
  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <UnlockOutlined className="!text-blue-500 text-lg" />
          <span className="text-gray-900 dark:text-gray-100">Unban User</span>
        </div>
      }
      open={open}
      onCancel={onCancel}
      footer={[
        <Button
          key="cancel"
          onClick={onCancel}
          className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500"
        >
          Cancel
        </Button>,
        <Button
          key="unban"
          type="primary"
          style={
            confirmButtonColor !== "primary" && confirmButtonColor !== "danger"
              ? {
                  backgroundColor: confirmButtonColor,
                  borderColor: confirmButtonColor,
                }
              : undefined
          }
          onClick={onConfirm}
          icon={<CheckCircleOutlined />}
          className={
            confirmButtonColor === "primary" || confirmButtonColor === "danger"
              ? undefined
              : "hover:opacity-90"
          }
        >
          Unban User
        </Button>,
      ]}
      width={500}
      className="unban-modal"
    >
      <div className="space-y-4 mt-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
            <UnlockOutlined className="!text-blue-500 text-lg" />
          </div>
          <div className="flex-1">
            <p className="text-gray-900 dark:text-gray-100 font-medium">
              Restore access for{" "}
              <span className="text-blue-600 dark:text-blue-400">
                {userName}
              </span>
              ?
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1.5">
              This will immediately restore the user's full access to the
              platform and all its features.
            </p>
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-3">
          <p className="text-blue-800 dark:text-blue-200 text-sm flex items-start gap-2">
            <CheckCircleOutlined className="text-blue-500 mt-0.5 flex-shrink-0" />
            <span>
              The user will be notified of their account restoration and can log
              in immediately.
            </span>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default UnbanModal;
