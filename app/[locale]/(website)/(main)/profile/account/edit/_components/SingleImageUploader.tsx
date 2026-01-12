"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { X, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SingleImageUploaderProps {
  label: string;
  existingImage: string | null; // e.g. "/storage/children/6/xxx.png"
  onImageChange: (file: File | null, deleted: boolean) => void;
  imageKey: string;
}

function resolveImageSrc(input?: string | null, baseUrl?: string) {
  if (!input) return "";
  const s = input.trim();

  // DataURL
  if (s.startsWith("data:image/")) return s;

  // Absolute URL
  if (s.startsWith("http://") || s.startsWith("https://")) return s;

  // Relative path -> prepend baseUrl
  if (baseUrl) {
    return `${baseUrl.replace(/\/$/, "")}/${s.replace(/^\//, "")}`;
  }

  return s;
}

const SingleImageUploader: React.FC<SingleImageUploaderProps> = ({
  label,
  existingImage,
  onImageChange,
  imageKey,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewRaw, setPreviewRaw] = useState<string | null>(null); // DataURL
  const [isDeleted, setIsDeleted] = useState(false);

  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "";

  /**
   * ✅ Critical fix:
   * - Do NOT auto-reset delete state on every `existingImage` change.
   * - Only react to a REAL backend change, and ONLY if the user has no local changes.
   */
  const prevExistingRef = useRef<string | null>(null);

  useEffect(() => {
    const prev = prevExistingRef.current;
    const next = existingImage ?? null;

    // store latest
    prevExistingRef.current = next;

    // no real change -> do nothing
    if (prev === next) return;

    // if user has local changes, never override them
    if (uploadedFile || previewRaw || isDeleted) return;

    // backend changed while user has no local changes:
    // keep UI as-is (existingImage will naturally render)
  }, [existingImage, uploadedFile, previewRaw, isDeleted]);

  const imageSrc = useMemo(() => {
    const raw = previewRaw || existingImage;
    return resolveImageSrc(raw, baseUrl);
  }, [previewRaw, existingImage, baseUrl]);

  const isDataUrl = imageSrc.startsWith("data:image/");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setUploadedFile(file);
    setIsDeleted(false);

    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setPreviewRaw(result); // DataURL
      onImageChange(file, false); // ✅ only here we tell parent about new file
    };
    reader.readAsDataURL(file);

    // reset input so user can pick same file again later if needed
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  /**
   * ✅ Critical fix:
   * If user selected a NEW local file (uploadedFile/previewRaw),
   * removing it should NOT mean deleting the backend image.
   */
  const handleRemove = () => {
    // remove local selection only
    if (uploadedFile || previewRaw) {
      setUploadedFile(null);
      setPreviewRaw(null);
      setIsDeleted(false);
      onImageChange(null, false);
      return;
    }

    // delete backend existing image
    if (existingImage) {
      setIsDeleted(true);
      onImageChange(null, true);
      return;
    }

    // nothing to remove
    setUploadedFile(null);
    setPreviewRaw(null);
    setIsDeleted(false);
    onImageChange(null, false);
  };

  const handleReset = () => {
    setIsDeleted(false);
    setUploadedFile(null);
    setPreviewRaw(null);
    onImageChange(null, false);
  };

  const showImage = !isDeleted && !!imageSrc;

  return (
    <div className="space-y-3">
      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </div>

      <div className="relative aspect-square rounded-lg border-2 border-dashed border-gray-300 overflow-hidden">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {showImage ? (
          <div className="w-full h-full relative">
            <Image
              src={imageSrc}
              alt={label}
              fill
              className="object-cover"
              sizes="(max-width: 200px) 100vw, 200px"
              unoptimized={isDataUrl}
            />

            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors z-10"
              aria-label={`Remove ${label}`}
            >
              <Trash2 className="w-4 h-4" />
            </button>

            {uploadedFile && (
              <div className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                New
              </div>
            )}
          </div>
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            onClick={() => fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
          >
            <Plus className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">Click to upload</span>
          </div>
        )}

        {isDeleted && (
          <div className="absolute inset-0 bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-700 rounded-lg flex flex-col items-center justify-center">
            <X className="w-8 h-8 text-red-500 mb-2" />
            <span className="text-sm text-red-600 dark:text-red-400">
              Deleted
            </span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="mt-2 text-xs"
            >
              Undo
            </Button>
          </div>
        )}
      </div>

      <div className="text-xs text-gray-500">
        {isDeleted
          ? "Will be removed"
          : uploadedFile
          ? "New image ready"
          : existingImage
          ? "Existing image"
          : "No image"}
      </div>
    </div>
  );
};

export default SingleImageUploader;
