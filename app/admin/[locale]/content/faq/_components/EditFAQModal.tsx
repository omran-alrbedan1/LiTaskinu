"use client";

import { Modal } from "antd";
import { Edit } from "lucide-react";
import FAQForm from "./FAQForm";

interface EditFAQModalProps {
  open: boolean;
  onClose: () => void;
  onEditFAQ: (data: FAQ, id: number) => Promise<void>;
  isLoading?: boolean;
  editingFAQ?: FAQ | null;
}

export function EditFAQModal({
  open,
  onClose,
  onEditFAQ,
  isLoading = false,
  editingFAQ,
}: EditFAQModalProps) {
  const handleSubmit = async (data: FAQ) => {
    if (editingFAQ?.id) {
      await onEditFAQ(data, editingFAQ.id);
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
              Edit FAQ
            </span>
            <p className="text-sm text-gray-500 mt-1">
              Update frequently asked question information
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
          <FAQForm
            key={editingFAQ?.id}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
            initialData={editingFAQ}
            isEdit
          />
        </div>
      </div>
    </Modal>
  );
}