// components/faq/FAQItem.tsx
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/components/shared";
import { MoveUp, MoveDown, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const FAQItem: React.FC<FAQItemProps> = ({
  faq,
  index,
  isEditing,
  totalFaqs,
  onUpdate,
  onRemove,
  onMoveUp,
  onMoveDown,
}) => {
  return (
    <div
      className={cn(
        "p-6 border border-gray-200 dark:border-gray-600 rounded-lg space-y-4"
      )}
    >
      <div className="flex items-start gap-4">
        {/* Question Number and Controls */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center bg-primary-color1 text-white justify-center w-8 h-8 rounded-full text-sm font-bold">
            {faq.order}
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
                disabled={index === totalFaqs - 1}
                className="h-6 w-6 p-0"
              >
                <MoveDown className="w-3 h-3" />
              </Button>
            </div>
          )}
        </div>

        <div className="flex-1 space-y-4">
          {/* Question Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Question {faq.order}
            </label>
            {isEditing ? (
              <Input
                value={faq.question}
                onChange={(e) => onUpdate(faq.id, "question", e.target.value)}
                placeholder="Enter question..."
                className="text-lg font-semibold border focus:ring-2 ring-primary-color1"
              />
            ) : (
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                {faq.question}
              </h3>
            )}
          </div>

          {/* Answer Editor */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Answer for Question {faq.order}
            </label>
            {isEditing ? (
              <RichTextEditor
                value={faq.answer}
                onChange={(value) => onUpdate(faq.id, "answer", value)}
                placeholder="Write the answer..."
                className="min-h-[150px]"
              />
            ) : (
              <div
                className="ql-editor p-0 prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              />
            )}
          </div>

          {/* Remove Button */}
          {isEditing && (
            <div className="flex items-center justify-end pt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemove(faq.id)}
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
