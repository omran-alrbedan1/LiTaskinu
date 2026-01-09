"use client";

import { Modal } from "antd";
import { Plus } from "lucide-react";
import StoryForm from "./StoryForm";

interface AddStoryModalProps {
  open: boolean;
  onClose: () => void;
  onAddStory: (data: any) => Promise<void>;
  isLoading?: boolean;
}

export function AddStoryModal({
  open,
  onClose,
  onAddStory,
  isLoading = false,
}: AddStoryModalProps) {
  const handleSubmit = async (data: any) => {
    console.log(data);
    await onAddStory(data);
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary-color1/80 rounded-lg">
            <Plus className="w-5 h-5 text-primary-color1" />
          </div>
          <div>
            <span className="text-xl font-bold text-gray-900">
              Add New Success Story
            </span>
            <p className="text-sm text-gray-500 mt-1">
              Share an inspiring story of a couple who found love
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
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
          />
        </div>
      </div>
    </Modal>
  );
}