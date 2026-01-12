"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Camera, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProfileImageUploaderProps {
  initialImage?: string | null; // could be full url OR relative path OR data url
  onChange: (file: File | null) => void;
  maxSize?: number; // in MB
}

function resolveImageSrc(input?: string | null, baseUrl?: string) {
  if (!input) return "";

  const s = input.trim();

  // 1) data url
  if (s.startsWith("data:image/")) return s;

  // 2) full url
  if (s.startsWith("http://") || s.startsWith("https://")) return s;

  // 3) relative path (prepend base url if provided)
  if (baseUrl) {
    return `${baseUrl.replace(/\/$/, "")}/${s.replace(/^\//, "")}`;
  }

  // fallback
  return s;
}

const ProfileImageUploader: React.FC<ProfileImageUploaderProps> = ({
  initialImage = null,
  onChange,
  maxSize = 5,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [previewRaw, setPreviewRaw] = useState<string>(initialImage ?? "");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string>("");

  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL || "";

  // keep preview in sync with initialImage ONLY when user hasn't picked a new file
  useEffect(() => {
    if (!selectedFile) {
      setPreviewRaw(initialImage ?? "");
    }
  }, [initialImage, selectedFile]);

  const previewSrc = useMemo(() => {
    return resolveImageSrc(previewRaw, baseUrl);
  }, [previewRaw, baseUrl]);

  const isDataUrl = previewSrc.startsWith("data:image/");

  const validateFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      return "Please upload an image file.";
    }
    const maxBytes = maxSize * 1024 * 1024;
    if (file.size > maxBytes) {
      return `File is too large. Max size is ${maxSize}MB.`;
    }
    return "";
  };

  const handleFileSelect = (file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");

    // Create preview (data url)
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreviewRaw(result); // this will be a data:image/... url
    };
    reader.readAsDataURL(file);

    setSelectedFile(file);
    onChange(file);

    // Reset input to allow selecting the same file again
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    handleFileSelect(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleRemove = () => {
    setError("");
    setPreviewRaw("");
    setSelectedFile(null);
    onChange(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Preview */}
        <div className="flex-shrink-0">
          {previewSrc ? (
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src={previewSrc}
                  alt="Profile preview"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                  // Data URLs should generally be unoptimized (and don't need remotePatterns)
                  unoptimized={isDataUrl}
                />
              </div>

              <button
                type="button"
                onClick={handleRemove}
                className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors shadow-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
              <Camera className="w-12 h-12 text-gray-400" />
            </div>
          )}
        </div>

        {/* Upload Area */}
        <div className="flex-1 w-full">
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
              isDragging
                ? "border-primary-color1 bg-primary-color1/5"
                : "border-gray-300 hover:border-primary-color1 hover:bg-gray-50"
            }`}
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            role="button"
            tabIndex={0}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            <div className="flex flex-col items-center gap-3">
              <div className="p-3 rounded-full bg-primary-color1/10">
                <Upload className="w-6 h-6 text-primary-color1" />
              </div>

              <div>
                <p className="font-medium text-gray-900 mb-1">
                  {previewSrc ? "Change profile photo" : "Upload profile photo"}
                </p>
                <p className="text-sm text-gray-500 mb-3">
                  Click to browse or drag and drop
                </p>
                <p className="text-xs text-gray-400">
                  Recommended: Square image, max {maxSize}MB
                </p>

                {error && (
                  <p className="mt-2 text-sm text-red-600">
                    {error}
                  </p>
                )}
              </div>

              <Button type="button" variant="outline" size="sm" className="mt-2">
                {previewSrc ? "Change Photo" : "Select Photo"}
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileImageUploader;
