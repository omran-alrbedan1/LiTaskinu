import React, { useState } from "react";
import { Modal, Button } from "antd";
import { XCircle } from "lucide-react";

interface DocumentRejectModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: (rejectionNote: string) => void;
  documentName: string;
}

const DocumentRejectModal: React.FC<DocumentRejectModalProps> = ({
  open,
  onCancel,
  onConfirm,
  documentName,
}) => {
  const [rejectionNote, setRejectionNote] = useState("");

  const handleConfirm = () => {
    if (rejectionNote.trim()) {
      onConfirm(rejectionNote);
      setRejectionNote("");
    }
  };

  const handleCancel = () => {
    setRejectionNote("");
    onCancel();
  };

  return (
    <Modal
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={500}
      centered
    >
      <div className=" w-full p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
            <XCircle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Reject Document
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Provide a reason for rejection
            </p>
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
          Why are you rejecting{" "}
          <strong className="text-gray-900 dark:text-white">
            {documentName}
          </strong>
          ? This feedback will help the user resubmit correctly.
        </p>

        <textarea
          value={rejectionNote}
          onChange={(e) => setRejectionNote(e.target.value)}
          placeholder="Please specify what needs to be corrected..."
          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none dark:bg-gray-700 dark:text-white mb-4 resize-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
          rows={4}
        />

        <div className="flex justify-end gap-3">
          <Button size="large" onClick={handleCancel} className="px-4">
            Cancel
          </Button>
          <Button
            size="large"
            type="primary"
            danger
            onClick={handleConfirm}
            disabled={!rejectionNote.trim()}
            icon={<XCircle className="w-4 h-4" />}
            className="px-4 bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-700"
          >
            Reject Document
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DocumentRejectModal;
