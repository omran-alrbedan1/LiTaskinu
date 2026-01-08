"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Camera, Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProfileImageUploaderProps {
  initialImage?: string;
  onChange: (file: File | null) => void;
  maxSize?: number; // in MB
}

const ProfileImageUploader: React.FC<ProfileImageUploaderProps> = ({
  initialImage,
  onChange,
  maxSize = 5,
}) => {
  const [preview, setPreview] = useState<string>(initialImage || '');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update preview when initialImage changes
  useEffect(() => {
    if (initialImage) {
      setPreview(initialImage);
    }
  }, [initialImage]);

  const handleFileSelect = (file: File) => {
    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreview(result);
    };
    reader.readAsDataURL(file);
    
    // Set file and notify parent
    setSelectedFile(file);
    onChange(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    handleFileSelect(file);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
    setPreview('');
    setSelectedFile(null);
    onChange(null);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Preview */}
        <div className="flex-shrink-0">
          {preview ? (
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src={preview}
                  alt="Profile preview"
                  width={160}
                  height={160}
                  className="w-full h-full object-cover"
                  unoptimized={preview.startsWith('blob:') || preview.startsWith('data:')}
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
        <div className="flex-1">
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
              isDragging
                ? 'border-primary-color1 bg-primary-color1/5'
                : 'border-gray-300 hover:border-primary-color1 hover:bg-gray-50'
            }`}
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
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
                  {preview ? 'Change profile photo' : 'Upload profile photo'}
                </p>
                <p className="text-sm text-gray-500 mb-3">
                  Click to browse or drag and drop
                </p>
                <p className="text-xs text-gray-400">
                  Recommended: Square image, max {maxSize}MB
                </p>
              </div>
              
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
              >
                {preview ? 'Change Photo' : 'Select Photo'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileImageUploader;