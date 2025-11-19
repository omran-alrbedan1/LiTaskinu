// components/admin/privacy/PrivacySection.tsx
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/components/shared";
import { MoveUp, MoveDown, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PrivacySectionType {
  id: string;
  order: number;
  title: string;
  content: string;
}

interface PrivacySectionProps {
  section: PrivacySectionType;
  index: number;
  isEditing: boolean;
  totalSections: number;
  onUpdate: (
    id: string,
    field: keyof PrivacySectionType,
    value: string
  ) => void;
  onRemove: (id: string) => void;
}

export const PrivacySection: React.FC<PrivacySectionProps> = ({
  section,
  index,
  isEditing,
  totalSections,
  onUpdate,
  onRemove,
}) => {
  return (
    <div
      className={cn(
        "p-6 border border-gray-200 dark:border-gray-600 rounded-lg space-y-4"
      )}
    >
      <div className="flex items-start gap-4">
        {/* Section Number and Controls */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center bg-primary-color1 text-white justify-center w-8 h-8 rounded-full text-sm font-bold">
            {section.order}
          </div>
        </div>

        <div className="flex-1 space-y-4">
          {/* Section Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Section Title
            </label>
            {isEditing ? (
              <Input
                value={section.title}
                onChange={(e) => onUpdate(section.id, "title", e.target.value)}
                placeholder="Enter section title..."
                className="text-lg font-semibold border focus:ring-2 ring-primary-color1"
              />
            ) : (
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {section.title}
              </h3>
            )}
          </div>

          {/* Content Editor */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Section Content
            </label>
            {isEditing ? (
              <RichTextEditor
                value={section.content}
                onChange={(value) => onUpdate(section.id, "content", value)}
                placeholder="Write the section content..."
                className="min-h-[200px]"
              />
            ) : (
              <div
                className="ql-editor p-0 prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            )}
          </div>

          {/* Remove Button */}
          {isEditing && (
            <div className="flex items-center justify-end pt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove(section.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <Trash2 className="w-4 h-4" />
                Remove Section
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
