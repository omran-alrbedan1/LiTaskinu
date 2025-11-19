"use client";
import React from "react";
import RichTextEditor from "./RichTextEditor";

interface RichTextSectionProps {
  title: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  isEditing: boolean;
  className?: string;
}

const RichTextSection = React.memo(
  ({
    title,
    value,
    onChange,
    placeholder,
    isEditing,
    className = "",
  }: RichTextSectionProps) => {
    return (
      <div className={`space-y-3 ${className}`}>
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {title}
        </label>
        {isEditing ? (
          <RichTextEditor
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="min-h-[200px] focus:ring-2 focus:ring-primary-color1"
          />
        ) : (
          <div
            className="ql-editor p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 min-h-[200px] prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: value }}
          />
        )}
      </div>
    );
  }
);

RichTextSection.displayName = "RichTextSection";

export default RichTextSection;
