"use client";

import React, { useState } from "react";
import { Grid } from "antd";
import { GrGallery } from "react-icons/gr";
import { EmptyGalleryState, PhotoCard, PhotoModal, DeletePhotoModal } from ".";

const { useBreakpoint } = Grid;

const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  photos = [],
  onPhotoDelete,
  maxDisplayPhotos = 6,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null);
  const screens = useBreakpoint();

  const displayPhotos = photos.slice(0, maxDisplayPhotos);
  const hasMorePhotos = photos.length > maxDisplayPhotos;

  const handleDeleteClick = (photoId: string) => {
    setSelectedPhotoId(photoId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedPhotoId) {
      //@ts-ignore
      onPhotoDelete(selectedPhotoId);
      setSelectedPhotoId(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Gallery Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-color1/30 rounded-lg">
            <GrGallery className="text-primary-color1 text-2xl" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Photo Gallery
            </h3>
            <p className="text-sm text-gray-600">{photos.length} photos</p>
          </div>
        </div>
      </div>

      {photos.length === 0 ? (
        <EmptyGalleryState />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {displayPhotos.map((photo, index) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              onDelete={() => handleDeleteClick(photo.id)}
              showViewAllOverlay={
                hasMorePhotos && index === displayPhotos.length - 1
              }
              remainingCount={photos.length - maxDisplayPhotos}
              onViewAll={() => setIsModalOpen(true)}
            />
          ))}
        </div>
      )}

      <PhotoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        photos={photos}
        onDeletePhoto={handleDeleteClick}
        modalWidth={screens.lg ? 800 : screens.md ? 600 : 400}
      />

      <DeletePhotoModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        photoId={selectedPhotoId!}
      />
    </div>
  );
};

export default PhotoGallery;
