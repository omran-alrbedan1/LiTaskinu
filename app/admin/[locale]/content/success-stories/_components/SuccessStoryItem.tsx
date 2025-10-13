// components/success-stories/SuccessStoryItem.tsx
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/components/shared";
import {
  MoveUp,
  MoveDown,
  Trash2,
  Calendar,
  MapPin,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SuccessStoryItemProps {
  story: SuccessStory;
  index: number;
  isEditing: boolean;
  totalStories: number;
  onUpdate: (id: string, field: keyof SuccessStory, value: unknown) => void;
  onRemove: (id: string) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
}

export const SuccessStoryItem: React.FC<SuccessStoryItemProps> = ({
  story,
  index,
  isEditing,
  totalStories,
  onUpdate,
  onRemove,
  onMoveUp,
  onMoveDown,
}) => {
  return (
    <div className="p-6 border border-gray-200 dark:border-gray-600 rounded-lg space-y-6">
      <div className="flex items-start gap-4">
        {/* Story Number and Controls */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center bg-primary-color1 text-white justify-center w-8 h-8 rounded-full text-sm font-bold">
            {story.order}
          </div>

          {isEditing && (
            <div className="flex flex-col gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onMoveUp(index)}
                disabled={index === 0}
                className="h-6 w-6 p-0"
              >
                <MoveUp className="w-3 h-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onMoveDown(index)}
                disabled={index === totalStories - 1}
                className="h-6 w-6 p-0"
              >
                <MoveDown className="w-3 h-3" />
              </Button>
            </div>
          )}
        </div>

        <div className="flex-1 space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Story Title
              </label>
              {isEditing ? (
                <Input
                  value={story.title}
                  onChange={(e) => onUpdate(story.id, "title", e.target.value)}
                  placeholder="Enter story title..."
                  className="font-semibold focus:ring-2 focus:ring-primary-color1 border"
                />
              ) : (
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  {story.title}
                </h3>
              )}
            </div>

            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Couple Names
              </label>
              {isEditing ? (
                <Input
                  value={story.coupleNames}
                  onChange={(e) =>
                    onUpdate(story.id, "coupleNames", e.target.value)
                  }
                  placeholder="Enter couple names..."
                  className="font-semibold focus:ring-2 focus:ring-primary-color1 border"
                />
              ) : (
                <div className="flex items-center gap-2 text-lg font-medium text-gray-800 dark:text-gray-200">
                  <Users className="w-4 h-4 text-primary-color1" />
                  {story.coupleNames}
                </div>
              )}
            </div>
          </div>

          {/* Marriage Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Marriage Date
              </label>
              {isEditing ? (
                <Input
                  value={story.marriageDate}
                  onChange={(e) =>
                    onUpdate(story.id, "marriageDate", e.target.value)
                  }
                  placeholder="Enter marriage date..."
                  className="font-semibold focus:ring-2 focus:ring-primary-color1 border"
                />
              ) : (
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Calendar className="w-4 h-4 text-primary-color1" />
                  {story.marriageDate}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Location
              </label>
              {isEditing ? (
                <Input
                  value={story.location}
                  onChange={(e) =>
                    onUpdate(story.id, "location", e.target.value)
                  }
                  placeholder="Enter location..."
                  className="font-semibold focus:ring-2 focus:ring-primary-color1 border"
                />
              ) : (
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <MapPin className="w-4 h-4 text-primary-color1" />
                  {story.location}
                </div>
              )}
            </div>
          </div>

          {/* Story Content */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Success Story
            </label>
            {isEditing ? (
              <RichTextEditor
                value={story.story}
                onChange={(value) => onUpdate(story.id, "story", value)}
                placeholder="Write the couple's success story..."
                className="min-h-[200px]"
              />
            ) : (
              <div
                className="ql-editor p-0 prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: story.story }}
              />
            )}
          </div>

          {/* Testimonial */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Couple Testimonial
            </label>
            {isEditing ? (
              <textarea
                value={story.testimonial}
                onChange={(e) =>
                  onUpdate(story.id, "testimonial", e.target.value)
                }
                placeholder="Enter couple testimonial..."
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white min-h-[100px] resize-y focus:ring-2 focus:ring-primary-color1 focus:outline-none focus:border-transparent"
              />
            ) : (
              <blockquote className="p-4 border-l-4 border-primary-color1 bg-gray-50 dark:bg-gray-800 italic text-gray-700 dark:text-gray-300">
                "{story.testimonial}"
              </blockquote>
            )}
          </div>

          {/* Remove Button */}
          {isEditing && (
            <div className="flex items-center justify-end pt-4 border-t border-gray-200 dark:border-gray-600">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove(story.id)}
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
