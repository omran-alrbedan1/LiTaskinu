// components/ModalPhotoCard.tsx
import { Button, Image } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import React from "react";

interface ModalPhotoCardProps {
  photo: Photo;
  onDelete: () => void;
}

const ModalPhotoCard: React.FC<ModalPhotoCardProps> = ({ photo, onDelete }) => (
  <div className="aspect-square relative w-full h-40">
    <Image
      src={photo.url}
      alt={photo.url}
      width="100%"
      height="100%"
      style={{
        objectFit: "cover",
        width: "100%",
        height: "100%",
      }}
      placeholder={
        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
          <EyeOutlined className="text-gray-400" />
        </div>
      }
    />
    <div className="absolute top-2 right-2">
      <Button
        type="primary"
        danger
        size="small"
        icon={<DeleteOutlined />}
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      />
    </div>
  </div>
);

export default ModalPhotoCard;
