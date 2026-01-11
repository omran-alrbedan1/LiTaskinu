"use client";
import React, { useState, useRef } from "react";
import { useRouter } from "@/i18n/navigation";
import { images } from "@/constants/images";
import SubmitButton from "@/components/Buttons/SubmitButton";
import Image from "next/image";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";

const PhotoUploadCard: React.FC<PhotoUploadCardProps> = ({
  title,
  description,
  onImageUpload,
  previewUrl,
}) => {
  const t = useTranslations("auth");

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
    <div className="border border-gray-600 rounded-lg p-4 bg-gray-800 hover:border-gray-500 transition-colors duration-200">
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
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-primary-color1 flex items-center justify-center flex-shrink-0">
            <Image
              src={previewUrl}
              alt={t("preview_alt")}
              className="object-cover"
              height={180}
              width={180}
            />
          </div>
        ) : (
          <div className="w-16 md:w-20 h-16 md:h-20 rounded-full bg-gray-700 flex items-center justify-center border border-gray-600 flex-shrink-0">
            <Plus className="text-primary-color1" />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-white text-base mb-1 leading-tight">
            {title}
          </h3>
          <p className="text-gray-300 text-sm">{description}</p>
          <p className="text-primary-color1 text-sm mt-1 font-medium">
            {previewUrl ? t("change_photo") : t("click_to_upload")}
          </p>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        capture={title.toLowerCase().includes("selfie") ? "user" : undefined}
      />
    </div>
  );
};

const UserPhotoForm = () => {
  const t = useTranslations("auth");

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
    <div className="w-full max-w-md mx-auto p-4 min-h-screen">
      {/* Header - More compact */}
      <div className="text-center mb-6 mt-12">
        <h1 className="text-xl font-bold text-white mb-1">{t("face_verification")}</h1>
        <p className="text-gray-400 text-sm">
          {t("upload_photos_instruction")}
        </p>
      </div>

      {/* Photo Upload Sections - More compact */}
      <div className="space-y-4 mb-6">
        <PhotoUploadCard
          title={t("right_side_photo")}
          description={t("right_side_description")}
          onImageUpload={(file) => handleImageUpload("rightSide", file)}
          previewUrl={previewUrls.rightSide}
        />

        <PhotoUploadCard
          title={t("left_side_photo")}
          description={t("left_side_description")}
          onImageUpload={(file) => handleImageUpload("leftSide", file)}
          previewUrl={previewUrls.leftSide}
        />

        <PhotoUploadCard
          title={t("selfie_photo")}
          description={t("selfie_description")}
          onImageUpload={(file) => handleImageUpload("selfie", file)}
          previewUrl={previewUrls.selfie}
        />
      </div>

      {/* Confirm Button */}
      <SubmitButton
        isLoading={isLoading}
        loadingText={t("verifying")}
        className="w-full"
        onClick={onSubmit}
      >
        {t("confirm")}
      </SubmitButton>

      {/* Help Text - Smaller */}
      <p className="text-center text-sm text-gray-400 mt-3">
        {t("ensure_clear_photos")}
      </p>
    </div>
  );
};

export default UserPhotoForm;
