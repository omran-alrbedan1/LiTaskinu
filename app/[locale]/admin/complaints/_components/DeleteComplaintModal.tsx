"use client";
import React from "react";
import { Modal, Button } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { Trash, AlertTriangle, User, FileText, Tag } from "lucide-react";

interface DeleteComplaintModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: (reason: string) => void;
  complaint: Complaint | null;
}

const DeleteComplaintModal: React.FC<DeleteComplaintModalProps> = ({
  visible,
  onCancel,
  onConfirm,
  complaint,
}) => {
  const handleSubmit = () => {
    onConfirm("");
    onCancel();
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2.5 pb-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-sm">
            <Trash className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-semibold">Delete Complaint</span>
        </div>
      }
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={560}
      centered
      className="delete-complaint-modal"
    >
      <div className="py-2">
        <div className="space-y-5">
          {/* Centered Icon with Animation */}
          <div className="flex flex-col items-center justify-center py-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-red-500 opacity-20 animate-ping"></div>
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg ring-4 ring-red-100">
                <Trash className="w-9 h-9 text-white" />
              </div>
            </div>
          </div>

          {/* Main Message */}
          <div className="text-center px-4">
            <p className="font-semibold text-lg leading-tight">
              Permanently delete complaint{" "}
              <span className="text-red-600 font-bold">#{complaint?.id}</span>?
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 leading-relaxed">
              This is a destructive action that cannot be reversed. The
              complaint record will be permanently erased from the system.
            </p>
          </div>

          {/* Complaint Details */}
          <div className="rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-red-600" />
              <p className="text-red-900 dark:text-red-500 text-sm font-semibold">
                Complaint Information:
              </p>
            </div>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-3 text-sm text-gray-700">
                <div className="w-6 h-6 rounded-md bg-red-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Tag className="w-3.5 h-3.5 text-red-500" />
                </div>
                <div className="flex-1">
                  <span className="font-medium dark:text-gray-300">
                    Complaint Type
                  </span>
                  <p className="text-gray-600 dark:text-gray-400 text-xs mt-0.5">
                    {complaint?.type || "N/A"}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-700">
                <div className="w-6 h-6 rounded-md bg-red-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <User className="w-3.5 h-3.5 text-red-500" />
                </div>
                <div className="flex-1">
                  <span className="font-medium dark:text-gray-300">
                    Reported User
                  </span>
                  <p className="text-gray-600 dark:text-gray-400 text-xs mt-0.5">
                    {complaint?.reporter.name || "N/A"}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-700">
                <div className="w-6 h-6 rounded-md bg-red-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                </div>
                <div className="flex-1">
                  <span className="font-medium dark:text-gray-300">
                    Description
                  </span>
                  <p className="text-gray-600 dark:text-gray-400 text-xs mt-0.5 line-clamp-2">
                    {complaint?.description || "N/A"}
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-gray-200 dark:border-gray-500">
          <Button
            onClick={onCancel}
            size="large"
            className="min-w-[110px] font-medium"
          >
            Cancel
          </Button>
          <Button
            type="primary"
            danger
            size="large"
            onClick={handleSubmit}
            icon={<CloseCircleOutlined />}
            className="min-w-[150px] font-medium shadow-lg hover:shadow-xl transition-shadow"
          >
            Yes, Delete Complaint
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteComplaintModal;
