"use client";

import React from "react";
import { Modal, Button } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import Image from "next/image";
import { images } from "@/constants/images";
import { useTranslations } from "next-intl";

interface ChatRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
}

const ChatRequestModal: React.FC<ChatRequestModalProps> = ({
  isOpen,
  onClose,
  userName,
}) => {
  const t = useTranslations("person_detail");

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={500}
      className="chat-request-modal"
    >
      <div className="text-center p-6">
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <Image
            src={images.request}
            className=""
            height={200}
            width={200}
            alt="request"
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-primary-color1 mb-4">
          {t('success_title')}
        </h2>

        {/* Message */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          {t.rich('request_message', {
            name: userName,
            span: (chunks) => <span className="font-semibold">{chunks}</span>
          })}
        </p>

        {/* Action Button */}
        <Button
          type="primary"
          size="middle"
          onClick={onClose}
          className="!px-8 !py-3 !h-auto text-base font-semibold"
        >
          {t('understand_btn')}
        </Button>
      </div>
    </Modal>
  );
};

export default ChatRequestModal;
