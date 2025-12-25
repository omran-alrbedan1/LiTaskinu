// app/admin/social-media/_components/AddSocialMediaModal.tsx
"use client";

import { Modal } from "antd";
import { Plus } from "lucide-react";
import { SocialMediaForm } from "./SocialMediaForm";

interface AddSocialMediaModalProps {
  open: boolean;
  onClose: () => void;
  onAddSocialMedia: (data: SocialMedia) => Promise<void>;
  isLoading?: boolean;
}

export function AddSocialMediaModal({
  open,
  onClose,
  onAddSocialMedia,
  isLoading = false,
}: AddSocialMediaModalProps) {
  const handleSubmit = async (data: SocialMedia) => {
    await onAddSocialMedia(data);
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary-light2 rounded-lg">
            <Plus className="w-5 h-5 text-primary-color1" />
          </div>
          <div>
            <span className="text-xl font-bold text-gray-900">
              Add New Contact Link
            </span>
            <p className="text-sm text-gray-500 mt-1">
              Add a new social media or contact link
            </p>
          </div>
        </div>
      }
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={800}
      centered
      destroyOnClose
      styles={{
        body: { padding: 0 },
        content: { borderRadius: "12px", overflow: "hidden" },
      }}
      className="[&_.ant-modal-content]:shadow-xl [&_.ant-modal-content]:border-0"
    >
      <div className="px-6 pb-6">
        <div className="mt-6">
          <SocialMediaForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
          />
        </div>
      </div>
    </Modal>
  );
}