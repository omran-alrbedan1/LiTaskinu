import React, { useState } from "react";
import { Modal, Input, Button } from "antd";
import { XCircle, MessageCircle, UserX } from "lucide-react";
import { FaUserXmark } from "react-icons/fa6";

const { TextArea } = Input;

interface RejectVerificationModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: (rejectionNote: string) => void;
  userName: string;
}

const RejectVerificationModal: React.FC<RejectVerificationModalProps> = ({
  open,
  onCancel,
  onConfirm,
  userName,
}) => {
  const [rejectionNote, setRejectionNote] = useState("");

  const handleConfirm = () => {
    onConfirm(rejectionNote);
    setRejectionNote("");
  };

  const handleCancel = () => {
    onCancel();
    setRejectionNote("");
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2.5 pb-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-sm">
            <UserX className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-semibold">
            Reject Verification Request
          </span>
        </div>
      }
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={580}
      centered
      destroyOnClose
      className="reject-verification-modal"
    >
      <div className="py-2">
        <div className="space-y-5">
          {/* Centered Icon with Animation */}
          <div className="flex flex-col items-center justify-center py-4">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-red-500 opacity-20 animate-ping"></div>
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-lg ring-4 ring-red-100">
                <FaUserXmark
                  className="w-9 ml-1 h-9 text-white"
                  strokeWidth={2.5}
                />
              </div>
            </div>
          </div>

          {/* Main Message */}
          <div className="text-center px-4">
            <p className="font-semibold text-lg leading-tight">
              Reject verification for{" "}
              <span className="text-red-600 font-bold">{userName}</span>?
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 leading-relaxed">
              This action will deny verification status and the user will need
              to resubmit their documents.
            </p>
          </div>

          {/* Rejection Reason Input */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-red-600" />
              <label className="block text-sm font-semibold">
                Rejection Reason
                <span className="text-gray-500 font-normal ml-1">
                  (Recommended)
                </span>
              </label>
            </div>

            <div className="relative">
              <TextArea
                rows={4}
                placeholder="Provide clear and constructive feedback about why the verification was rejected. This will help the user understand what needs to be corrected for their next submission..."
                value={rejectionNote}
                onChange={(e) => setRejectionNote(e.target.value)}
                className="resize-none border-gray-300 dark:border-gray-600 hover:border-red-300 focus:border-red-500 transition-colors"
                style={{ paddingRight: "40px" }}
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-400">
                {rejectionNote.length}/500
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-6 mt-4 border-t border-gray-200 dark:border-gray-700">
          <Button
            onClick={handleCancel}
            size="large"
            className="min-w-[110px] font-medium hover:bg-gray-100 transition-colors"
          >
            Cancel
          </Button>
          <Button
            type="primary"
            danger
            size="large"
            onClick={handleConfirm}
            icon={<XCircle className="w-4 h-4" />}
            disabled={!rejectionNote.trim()}
            className="min-w-[150px] font-medium shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-red-500 to-orange-600 border-red-500 hover:from-red-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Reject Verification
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default RejectVerificationModal;
