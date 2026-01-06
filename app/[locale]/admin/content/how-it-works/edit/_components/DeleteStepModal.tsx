// app/admin/how-it-works/edit/_components/DeleteStepModal.tsx
"use client";

import React from "react";
import { Modal } from "antd";
import { Button } from "@/components/ui/button";

interface DeleteStepModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  stepTitle?: string;
  loading?: boolean;
}

const DeleteStepModal: React.FC<DeleteStepModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  stepTitle = "this step",
  loading = false,
}) => {
  return (
    <Modal
      title="Delete Step"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={500}
      destroyOnClose
    >
      <div className="py-4">
        <p className="text-gray-600 mb-2">
          Are you sure you want to delete "{stepTitle}"?
        </p>
        <p className="text-gray-500 text-sm">
          This action cannot be undone. The remaining steps will be renumbered
          automatically.
        </p>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Button variant="outline" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button onClick={onDelete} variant="destructive" disabled={loading}>
          {loading ? "Deleting..." : "Delete Step"}
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteStepModal;
