import React from "react";
import { Modal, Button } from "antd";
import {
  CheckCircleOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

interface VerifyModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  userName: string;
}

const VerifyModal: React.FC<VerifyModalProps> = ({
  open,
  onCancel,
  onConfirm,
  userName,
}) => {
  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <CheckCircleOutlined className="!text-green-500 text-lg" />
          <span>Verify User</span>
        </div>
      }
      open={open}
      onCancel={onCancel}
      footer={null}
      width={500}
      centered
      destroyOnClose
      className="verify-modal"
    >
      <div className="py-4">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center">
              <SafetyCertificateOutlined className="!text-green-500 text-lg" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-900 dark:text-gray-100">
                Grant verified status to{" "}
                <span className="text-green-600 dark:text-green-400">
                  {userName}
                </span>
                ?
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1.5">
                This will mark the user as verified and grant them full access
                to all platform features.
              </p>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-lg p-3.5">
            <p className="text-green-900 dark:text-green-100 text-sm font-medium mb-2">
              Verified users will receive:
            </p>
            <ul className="space-y-1.5 text-green-800 dark:text-green-200 text-sm">
              <li className="flex items-center gap-2">
                <CheckCircleOutlined className="text-green-500 text-xs flex-shrink-0" />
                Verified badge on their profile
              </li>
              <li className="flex items-center gap-2">
                <CheckCircleOutlined className="text-green-500 text-xs flex-shrink-0" />
                Full access to premium features
              </li>
              <li className="flex items-center gap-2">
                <CheckCircleOutlined className="text-green-500 text-xs flex-shrink-0" />
                Enhanced trust and credibility
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6 mt-4 border-t border-gray-100 dark:border-gray-800">
          <Button
            onClick={onCancel}
            size="large"
            className="min-w-[100px] border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500"
          >
            Cancel
          </Button>
          <Button
            type="primary"
            size="large"
            onClick={onConfirm}
            icon={<CheckCircleOutlined />}
          >
            Verify User
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default VerifyModal;
