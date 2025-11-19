// components/DeletePhotoModal.tsx
import React from "react";
import { Modal } from "antd";
import { PictureOutlined } from "@ant-design/icons";

interface DeletePhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  photoId?: string;
}

export const DeletePhotoModal: React.FC<DeletePhotoModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  photoId,
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      title="Delete Photo"
      open={isOpen}
      onOk={handleConfirm}
      onCancel={onClose}
      okText="Delete"
      cancelText="Cancel"
      okType="danger"
      centered
    >
      <div className="text-center py-6">
        <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-200">
          <PictureOutlined className="text-white text-4xl" />
        </div>
        <p className="text-gray-600 text-base leading-relaxed">
          Are you sure you want to delete this photo?
        </p>
      </div>
    </Modal>
  );
};

export default DeletePhotoModal;
