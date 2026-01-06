"use client";
import React from "react";
import { Button, Modal } from "antd";
import { LogOut, AlertTriangle, LogOutIcon } from "lucide-react";
import { CgLogOut } from "react-icons/cg";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}) => {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={500}
      className="logout-confirmation-modal"
    >
      <div className="relative">
        <div className="px-8 py-8">
          <div className="text-center mb-8">
            <div className="relative flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-orange-50 rounded-full scale-150 opacity-30 animate-pulse"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-orange-100 rounded-full scale-125 opacity-50"></div>

                <div
                  className="relative w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full 
                              flex items-center justify-center shadow-2xl transform transition-transform duration-500
                              hover:scale-110"
                >
                  <LogOut size={36} className="text-white drop-shadow-lg" />

                  <div className="absolute -top-2 -right-2 w-3 h-3 bg-red-400 rounded-full animate-bounce opacity-80"></div>
                  <div className="absolute -bottom-1 -left-2 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                </div>

                <div className="absolute inset-0 border-2 border-red-200 rounded-full scale-150 opacity-30 animate-ping"></div>
              </div>
            </div>

            <h3
              className="text-2xl font-bold mb-3 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 
                           bg-clip-text text-transparent"
            >
              Confirm Logout
            </h3>

            <p className="text-gray-600 text-base leading-relaxed max-w-lg mx-auto">
              Are you sure you want to log out? You'll need to sign in again to
              access your account and continue where you left off.
            </p>
          </div>

          <div className="flex gap-3 px-16">
            {/* Cancel Button */}

            <Button onClick={onClose} size="large" disabled={isLoading}>
              Stay Signed In
            </Button>
            {/* Logout Button */}

            <Button
              onClick={onConfirm}
              size="large"
              type="primary"
              danger
              disabled={isLoading}
              icon={<LogOutIcon size={16} />}
            >
              Log Out
            </Button>
          </div>

          {/* Subtle warning footer */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <AlertTriangle size={12} />
              <span>
                Your session will end and you'll be redirected to login
              </span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LogoutModal;
