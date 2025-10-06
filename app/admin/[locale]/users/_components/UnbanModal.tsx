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
      title="Unban User"
      open={open}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
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
        >
          Unban User
        </Button>,
      ]}
      width={500}
    >
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
            <UnlockOutlined className="text-blue-500 text-lg" />
          </div>
          <div className="flex-1">
            <p className="text-gray-900 font-medium">
              Restore access for{" "}
              <span className="text-blue-600">{userName}</span>?
            </p>
            <p className="text-gray-600 text-sm mt-1.5">
              This will immediately restore the user's full access to the
              platform and all its features.
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
          <p className="text-blue-800 text-sm flex items-start gap-2">
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
