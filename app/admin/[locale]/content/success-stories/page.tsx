"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/admin/shared";
import { Save, Edit3 } from "lucide-react";
import { useSuccessStories } from "@/hooks/useSuccessStories";
import { StoriesList, StoriesPreview } from "./_components";

// Main Component
const SuccessStoriesPage = () => {
  const {
    isEditing,
    saving,
    stories,
    actions: {
      setIsEditing,
      addNewStory,
      removeStory,
      updateStory,
      moveStoryUp,
      moveStoryDown,
      saveStories,
      cancelEditing,
    },
  } = useSuccessStories();

  return (
    <div className="mx-auto pb-32 p-6 max-h-[90vh] sidebar-scrollbar overflow-auto">
      <div className="mb-6 flex items-center justify-between">
        <Header
          title="Manage Success Stories"
          description="Share inspiring stories of couples who found marriage through our platform"
        />
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                onClick={cancelEditing}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button
                onClick={saveStories}
                disabled={saving}
                className="flex items-center gap-2 bg-primary-color1 text-white"
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-primary-color1 text-white"
            >
              <Edit3 className="w-4 h-4" />
              Edit Stories
            </Button>
          )}
        </div>
      </div>

      <div className="space-y-6">
        <StoriesList
          stories={stories}
          isEditing={isEditing}
          onAddStory={addNewStory}
          onUpdateStory={updateStory}
          onRemoveStory={removeStory}
          onMoveStoryUp={moveStoryUp}
          onMoveStoryDown={moveStoryDown}
        />
      </div>
    </div>
  );
};

export default SuccessStoriesPage;
