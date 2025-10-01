// hooks/usePhotoUpload.ts
import { useState, useRef } from "react";
import { Modal } from "antd";

interface UsePhotoUploadProps {
  onPhotoUpload: (files: File[]) => Promise<void>;
}

export const usePhotoUpload = ({ onPhotoUpload }: UsePhotoUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    const validFiles = files.filter((file) => {
      if (!file.type.startsWith("image/")) {
        Modal.warning({
          title: "Invalid File Type",
          content: `${file.name} is not an image file`,
        });
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    setIsUploading(true);
    try {
      await onPhotoUpload(validFiles);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleAddPhotoClick = () => {
    fileInputRef.current?.click();
  };

  return {
    isUploading,
    fileInputRef,
    handleFileSelect,
    handleAddPhotoClick,
  };
};
