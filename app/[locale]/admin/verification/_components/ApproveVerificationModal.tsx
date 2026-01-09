import React from "react";
import { Modal, Button } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { CheckCircle, BadgeCheck } from "lucide-react";
import { FaUserCheck } from "react-icons/fa6";

interface ApproveVerificationModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  userName: string;
}

const ApproveVerificationModal: React.FC<ApproveVerificationModalProps> = ({
  open,
  onCancel,
  onConfirm,
  userName,
}) => {
  return (
    <Modal
      title={
        <div className="flex items-center gap-2.5 pb-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-sm">
            <BadgeCheck className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-semibold">
            Approve Verification Request
          </span>
        </div>
      }
      open={open}
      onCancel={onCancel}
      footer={null}
      width={560}
      centered
      destroyOnClose
      className="approve-verification-modal"
    >
      <div className="py-2">
        <div className="space-y-5">
          {/* Centered Icon with Animation */}
          <div className="flex flex-col items-center justify-center py-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-green-500 opacity-20 animate-ping"></div>
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg ring-4 ring-green-100">
                <FaUserCheck
                  className="w-9 h-9 ml-2 text-white"
                  strokeWidth={2.5}
                />
              </div>
            </div>
          </div>

          {/* Main Message */}
          <div className="text-center px-4">
            <p className="font-semibold text-lg leading-tight">
              Approve verification for{" "}
              <span className="text-green-600 font-bold">{userName}</span>?
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 leading-relaxed">
              This action will grant the user full verification status and
              access to all platform features.
            </p>
          </div>

          {/* Success Notification */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
            <p className="text-sm text-green-800 dark:text-green-200 flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4" />
              The user will be automatically notified about this approval
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-gray-200 dark:border-gray-700 ">
          <Button
            onClick={onCancel}
            size="large"
            className="min-w-[110px] font-medium hover:bg-gray-100 transition-colors"
          >
            Cancel
          </Button>
          <Button
            type="primary"
            size="large"
            onClick={onConfirm}
            icon={<CheckCircleOutlined />}
            className="min-w-[150px] font-medium shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-green-500 to-emerald-600 border-green-500 hover:from-green-600 hover:to-emerald-700"
          >
            Approve Verification
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ApproveVerificationModal;
