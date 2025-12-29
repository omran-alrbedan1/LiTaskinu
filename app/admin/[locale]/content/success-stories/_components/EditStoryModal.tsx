"use client";

import { Modal } from "antd";
import { Edit } from "lucide-react";
import StoryForm from "./StoryForm";

interface EditStoryModalProps {
  open: boolean;
  onClose: () => void;
  onEditStory: (data: any) => Promise<void>;
  isLoading?: boolean;
  editingStory?: any | null;
}

export function EditStoryModal({
  open,
  onClose,
  onEditStory,
  isLoading = false,
  editingStory,
}: EditStoryModalProps) {
  const handleSubmit = async (data: any) => {
    await onEditStory(data);
  };

  const handleCancel = () => {
    onClose();
  };
  console.log(editingStory)

  return (
    <Modal
      title={
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg">
            <Edit className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <span className="text-xl font-bold text-gray-900">
              Edit Success Story
            </span>
            <p className="text-sm text-gray-500 mt-1">
              Update the success story information
            </p>
          </div>
        </div>
      }
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={900}
      centered
      styles={{
        body: { padding: 0 },
        content: { borderRadius: "12px", overflow: "hidden" },
      }}
      className="[&_.ant-modal-content]:shadow-xl [&_.ant-modal-content]:border-0"
    >
      <div className="px-6 pb-6">
        <div className="mt-6">
          <StoryForm
            key={editingStory?.id}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            initialData={editingStory}
            isEdit
          />
        </div>
      </div>
    </Modal>
  );
}