"use client";

import * as React from "react";
import { Upload, Image as ImageIcon, File, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CustomUploadProps {
  onFileSelect: (file: File | null) => void;
  acceptedFileTypes?: string;
  maxFileSize?: number;
  previewUrl?: string;
  className?: string;
  label?: string;
  description?: string;
  multiple?: boolean;
  required?: boolean;
}

const CustomUpload: React.FC<CustomUploadProps> = ({
  onFileSelect,
  acceptedFileTypes = "image/*",
  maxFileSize = 10,
  previewUrl,
  className,
  label = "Upload file",
  description = "PNG, JPG, GIF up to 10MB",
  multiple = false,
  required = false,
}) => {
  const [dragActive, setDragActive] = React.useState(false);
  const [error, setError] = React.useState<string>("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFile = (file: File): boolean => {
    // Check file size
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > maxFileSize) {
      setError(`File size must be less than ${maxFileSize}MB`);
      return false;
    }

    // Check file type
    if (
      acceptedFileTypes !== "*/*" &&
      !file.type.match(acceptedFileTypes.replace("*", ".*"))
    ) {
      setError(`File type not supported. Accepted types: ${acceptedFileTypes}`);
      return false;
    }

    setError("");
    return true;
  };

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = multiple ? files : files[0];

    if (!multiple) {
      const singleFile = file as File;
      if (validateFile(singleFile)) {
        onFileSelect(singleFile);
      }
    } else {
      // Handle multiple files
      const validFiles: File[] = [];
      for (let i = 0; i < (file as FileList).length; i++) {
        const currentFile = (file as FileList)[i];
        if (validateFile(currentFile)) {
          validFiles.push(currentFile);
        }
      }
      // You might want to adjust the onFileSelect to handle multiple files
      // For now, we'll just take the first valid file
      if (validFiles.length > 0) {
        onFileSelect(validFiles[0]);
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    handleFiles(e.target.files);
  };

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  const removeFile = () => {
    onFileSelect(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const getFileIcon = () => {
    if (previewUrl) {
      return (
        <img
          src={previewUrl}
          alt="Preview"
          className="w-16 h-16 object-cover rounded-lg"
        />
      );
    }

    const isImage = acceptedFileTypes.includes("image");
    return isImage ? (
      <ImageIcon className="w-12 h-12 text-primary-color1" />
    ) : (
      <File className="w-12 h-12 text-primary-color1" />
    );
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div
        className={cn(
          "border-2 border-dashed border-primary-color1 rounded-lg p-6 text-center transition-colors cursor-pointer",
          dragActive
            ? "border-primary-color1 bg-primary-color1/10"
            : "border-gray-300 hover:border-primary",
          error && "border-red-300"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleButtonClick}
      >
        <div className="flex flex-col items-center justify-center space-y-3">
          {getFileIcon()}

          <div className="space-y-1">
            <p className="text-sm font-medium ">
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {description}
            </p>
          </div>

          <Button
            variant="outline"
            type="button"
            className="gap-2"
            onClick={(e) => {
              e.stopPropagation();
              handleButtonClick();
            }}
          >
            <Upload className="w-4 h-4" />
            Browse Files
          </Button>

          <input
            ref={inputRef}
            type="file"
            accept={acceptedFileTypes}
            onChange={handleChange}
            multiple={multiple}
            className="hidden"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-600 text-center">{error}</p>}

      {previewUrl && (
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-3">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-12 h-12 object-cover rounded"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">Selected file</p>
              <p className="text-xs text-gray-600">Ready to upload</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={removeFile}
            className="text-gray-400 hover:text-red-600"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default CustomUpload;
