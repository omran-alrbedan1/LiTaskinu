"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Upload, X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageUploaderProps {
  existingImages: string[];
  onChange: (files: File[], existingUrls: string[]) => void;
  maxImages: number;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  existingImages = [],
  onChange,
  maxImages = 4,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [uploadedPreviews, setUploadedPreviews] = useState<string[]>([]);

  const handleFileSelect = (files: FileList) => {
    const newFiles: File[] = [];
    const newPreviews: string[] = [];
    
    // Calculate remaining slots
    const totalExisting = existingImages.length;
    const totalUploaded = uploadedFiles.length;
    const remainingSlots = maxImages - (totalExisting + totalUploaded);
    
    if (remainingSlots <= 0) {
      alert(`Maximum ${maxImages} images allowed`);
      return;
    }
    
    Array.from(files).slice(0, remainingSlots).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        alert('Please upload image files only');
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      
      newFiles.push(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        newPreviews.push(result);
        
        if (newPreviews.length === newFiles.length) {
          const allFiles = [...uploadedFiles, ...newFiles];
          const allPreviews = [...uploadedPreviews, ...newPreviews];
          setUploadedFiles(allFiles);
          setUploadedPreviews(allPreviews);
          
          // Notify parent with both files and existing URLs
          onChange(allFiles, existingImages);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileSelect(e.target.files);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleRemoveExisting = (index: number) => {
    const newExistingImages = existingImages.filter((_, i) => i !== index);
    onChange(uploadedFiles, newExistingImages);
  };

  const handleRemoveUploaded = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    const newPreviews = uploadedPreviews.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
    setUploadedPreviews(newPreviews);
    onChange(newFiles, existingImages);
  };

  const totalImages = existingImages.length + uploadedFiles.length;
  const remainingSlots = maxImages - totalImages;

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        multiple
        className="hidden"
      />
      
      {/* Images Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* Existing Images from API */}
        {existingImages.map((image, index) => (
          <div key={`existing-${index}`} className="relative group">
            <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
              <Image
                src={image}
                alt={`Profile image ${index + 1}`}
                width={200}
                height={200}
                className="w-full h-full object-cover"
              />
            </div>
            <button
              type="button"
              onClick={() => handleRemoveExisting(index)}
              className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
              Existing
            </div>
          </div>
        ))}
        
        {/* Newly uploaded images */}
        {uploadedPreviews.map((preview, index) => (
          <div key={`uploaded-${index}`} className="relative group">
            <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
              <Image
                src={preview}
                alt={`New image ${index + 1}`}
                width={200}
                height={200}
                className="w-full h-full object-cover"
                unoptimized
              />
            </div>
            <button
              type="button"
              onClick={() => handleRemoveUploaded(index)}
              className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="absolute bottom-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
              New
            </div>
          </div>
        ))}
        
        {/* Empty Slots */}
        {Array.from({ length: remainingSlots }).map((_, index) => (
          <div
            key={`empty-${index}`}
            className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-primary-color1 hover:bg-gray-50 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <Plus className="w-8 h-8 text-gray-400" />
          </div>
        ))}
      </div>
      
      {/* Upload Area */}
      {remainingSlots > 0 && (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
            isDragging
              ? 'border-primary-color1 bg-primary-color1/5'
              : 'border-gray-300 hover:border-primary-color1 hover:bg-gray-50'
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => remainingSlots > 0 && fileInputRef.current?.click()}
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="font-medium text-gray-900 mb-2">
            Drag & drop images here
          </p>
          <p className="text-sm text-gray-500 mb-4">
            or click to browse files
          </p>
          <p className="text-xs text-gray-400">
            Upload up to {remainingSlots} more images • Max 5MB each
          </p>
        </div>
      )}
      
      {/* Counter */}
      <div className="mt-4 text-sm text-gray-500">
        {totalImages} of {maxImages} images uploaded
        {existingImages.length > 0 && ` (${existingImages.length} existing)`}
        {uploadedFiles.length > 0 && ` (${uploadedFiles.length} new)`}
      </div>
    </div>
  );
};

export default ImageUploader;