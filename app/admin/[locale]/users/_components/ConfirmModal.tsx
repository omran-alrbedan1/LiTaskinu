import React from "react";
import { Modal, Button } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

interface ConfirmModalProps {
  type: "verify" | "unban" | "delete" | string;
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  title: string;
  confirmText: string;
  content: React.ReactNode;
  confirmButtonColor?: string; // Color parameter
  icon?: React.ReactNode;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  onCancel,
  onConfirm,
  title,
  confirmText,
  content,
  confirmButtonColor = "primary",
  icon,
}) => {
  return (
    <Modal
      title={title}
      open={open}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="confirm"
          type="primary"
          danger={confirmButtonColor === "danger"}
          style={
            confirmButtonColor !== "primary" && confirmButtonColor !== "danger"
              ? {
                  backgroundColor: confirmButtonColor,
                  borderColor: confirmButtonColor,
                }
              : undefined
          }
          onClick={onConfirm}
          icon={icon || <CheckCircleOutlined />}
        >
          {confirmText}
        </Button>,
      ]}
    >
      {content}
    </Modal>
  );
};

export default ConfirmModal;
