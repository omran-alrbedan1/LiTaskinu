"use client";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { images } from "@/constants/images";
import SubmitButton from "@/components/Buttons/SubmitButton";
import Image from "next/image";
import { Plus } from "lucide-react";

const PhotoUploadCard: React.FC<PhotoUploadCardProps> = ({
  title,
  description,
  onImageUpload,
  previewUrl,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      onImageUpload(file);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white hover:border-gray-400 transition-colors duration-200">
      <div
        className={`flex items-center space-x-4 cursor-pointer ${
          isDragOver ? "opacity-70" : ""
        }`}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {previewUrl ? (
          <div className="relative w-20 h-20 rounded-full overflow-hidden border border-primary-color1 flex items-center justify-center flex-shrink-0">
            <Image
              src={previewUrl}
              alt="Preview"
              className="object-cover"
              height={180}
              width={180}
            />
          </div>
        ) : (
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center border border-gray-300 flex-shrink-0">
            <Plus className="text-primary-color1" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 text-base mb-1 leading-tight">
            {title}
          </h3>
          <p className="text-gray-600 text-sm">{description}</p>
          <p className="text-primary-color1 text-sm mt-1 font-medium">
            {previewUrl ? "Change photo" : "Click to upload"}
          </p>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        capture={title.includes("selfie") ? "user" : undefined}
      />
    </div>
  );
};

const UserPhotoForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [photos, setPhotos] = useState<{
    rightSide: File | null;
    leftSide: File | null;
    selfie: File | null;
  }>({
    rightSide: null,
    leftSide: null,
    selfie: null,
  });

  const [previewUrls, setPreviewUrls] = useState<{
    rightSide: string;
    leftSide: string;
    selfie: string;
  }>({
    rightSide: "",
    leftSide: "",
    selfie: "",
  });

  const router = useRouter();

  const handleImageUpload = (type: keyof typeof photos, file: File) => {
    setPhotos((prev) => ({ ...prev, [type]: file }));

    const previewUrl = URL.createObjectURL(file);
    setPreviewUrls((prev) => ({ ...prev, [type]: previewUrl }));
  };

  const allPhotosUploaded =
    photos.rightSide && photos.leftSide && photos.selfie;

  async function onSubmit() {
    if (!allPhotosUploaded) return;

    setIsLoading(true);
    try {
      console.log("Uploading photos:", photos);

      // Navigate to next step
      router.push("./home");
    } catch (error) {
      console.error("Photo upload error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Clean up preview URLs
  React.useEffect(() => {
    return () => {
      Object.values(previewUrls).forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, []);

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-white">
      {/* Header - More compact */}
      <div className="text-center mb-6">
        <Image
          src={images.logo2}
          width={60}
          height={60}
          alt="logo"
          className="mx-auto mb-3"
        />
        <h1 className="text-xl font-bold text-gray-900 mb-1">
          Face Verification
        </h1>
        <p className="text-gray-600 text-sm">
          Upload clear photos from different angles
        </p>
      </div>

      {/* Photo Upload Sections - More compact */}
      <div className="space-y-4 mb-6">
        <PhotoUploadCard
          title="Right side photo"
          description="Clear view of right side"
          onImageUpload={(file) => handleImageUpload("rightSide", file)}
          previewUrl={previewUrls.rightSide}
        />

        <PhotoUploadCard
          title="Left side photo"
          description="Clear view of left side"
          onImageUpload={(file) => handleImageUpload("leftSide", file)}
          previewUrl={previewUrls.leftSide}
        />

        <PhotoUploadCard
          title="Selfie photo"
          description="Front facing selfie"
          onImageUpload={(file) => handleImageUpload("selfie", file)}
          previewUrl={previewUrls.selfie}
        />
      </div>

      {/* Confirm Button */}
      <SubmitButton
        isLoading={isLoading}
        loadingText="Verifying..."
        className="w-full"
        onClick={onSubmit}
      >
        Confirm
      </SubmitButton>

      {/* Help Text - Smaller */}
      <p className="text-center text-sm text-gray-500 mt-3">
        Ensure photos are clear and well-lit
      </p>
    </div>
  );
};

export default UserPhotoForm;
