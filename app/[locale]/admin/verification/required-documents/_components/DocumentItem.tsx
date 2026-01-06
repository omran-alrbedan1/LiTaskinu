import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/components/shared";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";

interface DocumentItemProps {
  document: RequiredDocument;
  index: number;
  isEditing: boolean;
  totalDocuments: number;
  onUpdate: (id: string, field: keyof RequiredDocument, value: unknown) => void;
  onRemove: (id: string) => void;
}

export const DocumentItem: React.FC<DocumentItemProps> = ({
  document: doc,
  index,
  isEditing,
  totalDocuments,
  onUpdate,
  onRemove,
}) => {
  return (
    <div className="p-6 border border-gray-200 dark:border-gray-600 rounded-lg space-y-4">
      <div className="flex items-start gap-4">
        {/* Document Number and Controls */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center bg-primary-color1 text-white justify-center w-8 h-8 rounded-full text-sm font-bold">
            {doc.id}
          </div>
        </div>

        <div className="flex-1 space-y-4">
          {/* Basic Information */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Document Title
              </label>
              {isEditing ? (
                <Input
                  value={doc.title}
                  onChange={(e) => onUpdate(doc.id, "title", e.target.value)}
                  placeholder="Enter document title..."
                  className="font-semibold"
                />
              ) : (
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {doc.title}
                </h3>
              )}
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>
              {isEditing ? (
                <Input
                  value={doc.description}
                  onChange={(e) =>
                    onUpdate(doc.id, "description", e.target.value)
                  }
                  placeholder="Enter document description..."
                />
              ) : (
                <p className="text-gray-600 dark:text-gray-400">
                  {doc.description}
                </p>
              )}
            </div>
          </div>

          {/* Document Specifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Applicable To
              </label>
              {isEditing ? (
                <select
                  value={doc.forUserType}
                  onChange={(e) =>
                    onUpdate(doc.id, "forUserType", e.target.value)
                  }
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white"
                >
                  <option value="all">All Users</option>
                  <option value="male">Male Users Only</option>
                  <option value="female">Female Users Only</option>
                </select>
              ) : (
                <Badge variant="outline">
                  {doc.forUserType === "all"
                    ? "All Users"
                    : doc.forUserType === "male"
                    ? "Male Only"
                    : "Female Only"}
                </Badge>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Upload Instructions
            </label>
            {isEditing ? (
              <RichTextEditor
                value={doc.instructions}
                onChange={(value) => onUpdate(doc.id, "instructions", value)}
                placeholder="Provide detailed instructions for uploading this document..."
                className="min-h-[100px]"
              />
            ) : (
              <div
                className="ql-editor p-0 prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-400"
                dangerouslySetInnerHTML={{ __html: doc.instructions }}
              />
            )}
          </div>

          {/* Status Controls */}
          {isEditing && (
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={doc.isRequired}
                    onChange={(e) =>
                      onUpdate(doc.id, "isRequired", e.target.checked)
                    }
                    className="rounded border-gray-300"
                  />
                  Required Document
                </label>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove(doc.id)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <Trash2 className="w-4 h-4" />
                Remove
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
