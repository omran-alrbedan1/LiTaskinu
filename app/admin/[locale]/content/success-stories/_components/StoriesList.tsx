// components/success-stories/StoriesList.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Heart } from "lucide-react";
import { SuccessStoryItem } from "./SuccessStoryItem";

interface StoriesListProps {
  stories: SuccessStory[];
  isEditing: boolean;
  onAddStory: () => void;
  onUpdateStory: (
    id: string,
    field: keyof SuccessStory,
    value: unknown
  ) => void;
  onRemoveStory: (id: string) => void;
  onMoveStoryUp: (index: number) => void;
  onMoveStoryDown: (index: number) => void;
}

export const StoriesList: React.FC<StoriesListProps> = ({
  stories,
  isEditing,
  onAddStory,
  onUpdateStory,
  onRemoveStory,
  onMoveStoryUp,
  onMoveStoryDown,
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Heart className="w-5 h-5 text-primary-color1" />
        Success Stories
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          ({stories.length} stories)
        </span>
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-8">
      {stories.map((story, index) => (
        <SuccessStoryItem
          key={story.id}
          story={story}
          index={index}
          isEditing={isEditing}
          totalStories={stories.length}
          onUpdate={onUpdateStory}
          onRemove={onRemoveStory}
          onMoveUp={onMoveStoryUp}
          onMoveDown={onMoveStoryDown}
        />
      ))}

      {isEditing && (
        <div className="flex justify-center pt-4">
          <Button
            onClick={onAddStory}
            className="flex items-center gap-2"
            variant="outline"
          >
            <Plus className="w-4 h-4" />
            Add New Success Story
          </Button>
        </div>
      )}
    </CardContent>
  </Card>
);
