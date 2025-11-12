"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

interface ImageUploaderProps {
  value?: string[];
  onChange: (newImages: string[]) => void;
  maxImages?: number;
}

const ImageUploader = ({
  value = [],
  onChange,
  maxImages = 4,
}: ImageUploaderProps) => {
  const [previews, setPreviews] = useState<string[]>(value);

  const handleUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        const updated = [...previews];
        updated[index] = reader.result as string;
        setPreviews(updated);
        onChange(updated);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = (index: number) => {
    const updated = [...previews];
    updated[index] = "";
    setPreviews(updated);
    onChange(updated);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl mx-auto p-4">
      {Array.from({ length: maxImages }).map((_, i) => (
        <label
          key={i}
          className="relative aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer bg-white 
                     transition-all duration-300 hover:border-primary-color1 hover:bg-primary-light/20 hover:scale-[1.03]"
        >
          {previews[i] ? (
            <>
              <img
                src={previews[i]}
                alt={`Uploaded ${i + 1}`}
                className="w-full h-full object-cover rounded-2xl"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleRemove(i);
                }}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-md transition-transform hover:scale-110"
                aria-label="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <Plus className="w-6 h-6 text-gray-400 group-hover:text-primary-color1 mb-1 transition-colors duration-200" />
              <span className="text-sm text-gray-500">Upload your photo</span>
            </>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleUpload(e, i)}
          />
        </label>
      ))}
    </div>
  );
};

export default ImageUploader;
