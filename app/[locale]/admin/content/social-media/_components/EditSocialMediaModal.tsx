// app/admin/social-media/_components/EditSocialMediaModal.tsx
"use client";

import { Modal } from "antd";
import { Edit } from "lucide-react";
import { SocialMediaForm } from "./SocialMediaForm";

interface EditSocialMediaModalProps {
  open: boolean;
  onClose: () => void;
  onEditSocialMedia: (data: FormData | SocialMedia, id: number) => Promise<void>; // Update type
  isLoading?: boolean;
  editingSocialMedia?: SocialMedia | null;
}

export function EditSocialMediaModal({
  open,
  onClose,
  onEditSocialMedia,
  isLoading = false,
  editingSocialMedia,
}: EditSocialMediaModalProps) {

  const handleSubmit = async (data: FormData | SocialMedia) => {
    if (editingSocialMedia?.id) {
      await onEditSocialMedia(data, editingSocialMedia.id);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
            <Edit className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <span className="text-xl font-bold text-gray-900">
              Edit Contact Link
            </span>
            <p className="text-sm text-gray-500 mt-1">
              Update contact link information
            </p>
          </div>
        </div>
      }
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={800}
      centered
          styles={{
        body: { padding: 0 },
        content: { borderRadius: "12px", overflow: "hidden" },
      }}
      className="[&_.ant-modal-content]:shadow-xl [&_.ant-modal-content]:border-0"
    >
      <div className="px-6 pb-6">
        <div className="mt-6">
          <SocialMediaForm
           key={editingSocialMedia?.id}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
            initialData={editingSocialMedia}
            isEdit
          />
        </div>
      </div>
    </Modal>
  );
}