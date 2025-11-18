// components/admin/shared/DeleteModal.tsx
"use client";
import React from "react";
import { Button, Modal } from "antd";
import { Trash2, AlertTriangle } from "lucide-react";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  title?: string;
  itemName?: string;
  description?: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  title = "Confirm Delete",
  itemName = "this item",
  description = "This action cannot be undone. All associated data will be permanently removed from the system.",
}) => {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={500}
      className="delete-confirmation-modal"
    >
      <div className="relative">
        <div className="px-8 py-8">
          <div className="text-center mb-8">
            <div className="relative flex justify-center mb-6">
              <div className="relative">
                {/* Animated background effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-orange-50 rounded-full scale-150 opacity-30 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-orange-100 rounded-full scale-125 opacity-50"></div>

                {/* Main icon container */}
                <div
                  className="relative w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full 
                              flex items-center justify-center shadow-2xl transform transition-transform duration-500
                              hover:scale-110"
                >
                  <Trash2 size={36} className="text-white drop-shadow-lg" />

                  {/* Animated dots */}
                  <div className="absolute -top-2 -right-2 w-3 h-3 bg-red-400 rounded-full animate-bounce opacity-80"></div>
                  <div className="absolute -bottom-1 -left-2 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                </div>

                {/* Pinging border effect */}
                <div className="absolute inset-0 border-2 border-red-200 rounded-full scale-150 opacity-30 animate-ping"></div>
              </div>
            </div>

            {/* Title */}
            <h3
              className="text-2xl font-bold mb-3 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 
                           bg-clip-text text-transparent"
            >
              {title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-base leading-relaxed max-w-lg mx-auto">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-red-600">{itemName}</span>?{" "}
              {description}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 px-4">
            {/* Cancel Button */}
            {!isLoading && (
              <Button
                onClick={onClose}
                size="large"
                disabled={isLoading}
                className="flex-1 h-12 text-base font-medium border-gray-300 hover:border-gray-400"
              >
                Cancel
              </Button>
            )}

            {/* Delete Button */}
            <Button
              onClick={onConfirm}
              size="large"
              type="primary"
              danger
              disabled={isLoading}
              loading={isLoading}
              icon={<Trash2 size={16} />}
              className="flex-1 h-12 text-base font-medium bg-gradient-to-r from-red-500 to-red-600 border-red-600 hover:from-red-600 hover:to-red-700"
            >
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          </div>

          {/* Warning footer */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <AlertTriangle size={12} />
              <span>This action is permanent and cannot be reversed</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
