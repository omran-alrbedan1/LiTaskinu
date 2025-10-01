//@ts-nocheck
"use client";

import React, { useState } from "react";
import { GrGallery } from "react-icons/gr";
import { images } from "@/constants/images";
import { Image, Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";

interface Photo {
  id: string;
  url: string;
}

interface PhotoGalleryProps {
  photos?: Photo[];
  maxDisplayPhotos?: number;
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  photos = [],
  maxDisplayPhotos = 6,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const displayPhotos = photos.slice(0, maxDisplayPhotos);
  const hasMorePhotos = photos.length > maxDisplayPhotos;
  const remainingCount = photos.length - maxDisplayPhotos;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Photos Grid */}
      {photos.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border border-primary-color1 border-dashed ">
          <GrGallery className="text-primary-color1 text-4xl mx-auto mb-3" />
          <p className="text-gray-500 text-sm">No photos available</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {displayPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
            >
              <Image
                src={photo.url || images.Unknown}
                alt={`Gallery photo ${index + 1}`}
                className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              />

              {/* View All Overlay for last photo when there are more photos */}
              {hasMorePhotos && index === displayPhotos.length - 1 && (
                <div
                  className="absolute inset-0 bg-black/60 flex items-center justify-center"
                  onClick={openModal}
                >
                  <span className="text-white font-semibold text-lg">
                    +{remainingCount} more
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <Modal
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        width="70vw"
        style={{ maxWidth: "1250px" }}
        closeIcon={<CloseOutlined className="text-primary-color1 text-lg" />}
      >
        <div className="space-y-6">
          {/* Modal Header */}
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-color1/30 rounded-lg">
              <GrGallery className="text-primary-color1 text-2xl" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                All Photos
              </h3>
              <p className="text-sm text-gray-600">{photos.length} photos</p>
            </div>
          </div>

          {/* All Photos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 hide-scrollbar lg:grid-cols-4 xl:grid-cols-4 gap-4 max-h-[64vh] overflow-y-auto">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                className="relative aspect-square rounded-lg overflow-hidden group"
              >
                <Image
                  src={photo.url || images.Unknown}
                  alt={`Gallery photo ${index + 1}`}
                  className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PhotoGallery;
