import React from "react";
import { Card, Button, Image } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";

interface PhotoCardProps {
  photo: Photo;
  onDelete: any;
  showViewAllOverlay?: boolean;
  remainingCount?: number;
  onViewAll?: () => void;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({
  photo,
  onDelete,
  showViewAllOverlay = false,
  remainingCount = 0,
  onViewAll,
}) => (
  <Card
    className="relative group cursor-pointer hover:shadow-lg transition-all duration-200"
    bodyStyle={{ padding: 0 }}
    hoverable
  >
    <div className="aspect-square relative w-full h-32">
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

      {showViewAllOverlay && (
        <div
          className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer"
          onClick={onViewAll}
        >
          <div className="text-white text-center">
            <div className="text-2xl font-bold">+{remainingCount}</div>
            <div className="text-sm">View All</div>
          </div>
        </div>
      )}

      {!showViewAllOverlay && (
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
      )}
    </div>
  </Card>
);

export default PhotoCard;
