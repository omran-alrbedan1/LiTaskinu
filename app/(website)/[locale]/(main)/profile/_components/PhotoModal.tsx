// components/PhotoModal.tsx
"use client";

import React, { useState } from "react";
import { Modal } from "antd";
import ModalPhotoCard from "./ModalPhotoCard";
import { GrGallery } from "react-icons/gr";
import DeletePhotoModal from "./DeletePhotoModal";

interface PhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  photos: Photo[];
  onDeletePhoto: (photoId: string) => void;
  modalWidth?: number | string;
  title?: string;
}

const PhotoModal: React.FC<PhotoModalProps> = ({
  isOpen,
  onClose,
  photos,
  onDeletePhoto,
  modalWidth = 800,
  title,
}) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPhotoId, setSelectedPhotoId] = useState<string | null>(null);

  const modalTitle = title || `All Photos (${photos.length})`;

  const handleDeleteClick = (photoId: string) => {
    setSelectedPhotoId(photoId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedPhotoId) {
      onDeletePhoto(selectedPhotoId);
      setSelectedPhotoId(null);
    }
  };

  return (
    <>
      <Modal
        title={
          <p className="flex gap-2">
            <GrGallery className="inline-block text-primary-color1 text-2xl " />
            <span>{modalTitle}</span>
          </p>
        }
        open={isOpen}
        onCancel={onClose}
        footer={null}
        width={modalWidth}
        centered
        className="photo-gallery-modal"
      >
        <div className="mt-4">
          {photos.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No photos available
            </div>
          ) : (
            <div className="grid grid-cols-2 hide-scrollbar md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[60vh] overflow-y-auto">
              {photos.map((photo) => (
                <ModalPhotoCard
                  key={photo.id}
                  photo={photo}
                  onDelete={() => handleDeleteClick(photo.id)}
                />
              ))}
            </div>
          )}
        </div>
      </Modal>

      <DeletePhotoModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        photoId={selectedPhotoId!}
      />
    </>
  );
};

export default PhotoModal;
