//@ts-nocheck
import { initialSuccessStories } from "@/constants/temporary";
import { useState, useCallback } from "react";

export const useSuccessStories = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [stories, setStories] = useState<SuccessStory[]>(initialSuccessStories);

  const addNewStory = useCallback(() => {
    const newStory: SuccessStory = {
      id: Date.now().toString(),
      title: "New Success Story",
      coupleNames: "Couple Names",
      marriageDate: "Date",
      location: "Location",
      story:
        "<p>Share the beautiful story of how this couple met and married through our platform...</p>",
      testimonial: "Couple testimonial about their experience...",
      order: stories.length + 1,
    };
    setStories((prev) => [...prev, newStory]);
  }, [stories.length]);

  const removeStory = useCallback((id: string) => {
    setStories((prev) => prev.filter((story) => story.id !== id));
  }, []);

  const updateStory = useCallback(
    (id: string, field: keyof SuccessStory, value: unknown) => {
      setStories((prev) =>
        prev.map((story) =>
          story.id === id ? { ...story, [field]: value } : story
        )
      );
    },
    []
  );

  const moveStory = useCallback(
    (fromIndex: number, toIndex: number) => {
      if (toIndex < 0 || toIndex >= stories.length) return;

      setStories((prev) => {
        const newStories = [...prev];
        const [movedItem] = newStories.splice(fromIndex, 1);
        newStories.splice(toIndex, 0, movedItem);

        return newStories.map((story, index) => ({
          ...story,
          order: index + 1,
        }));
      });
    },
    [stories.length]
  );

  const moveStoryUp = useCallback(
    (index: number) => {
      moveStory(index, index - 1);
    },
    [moveStory]
  );

  const moveStoryDown = useCallback(
    (index: number) => {
      moveStory(index, index + 1);
    },
    [moveStory]
  );

  const saveStories = async () => {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    setIsEditing(false);
    console.log("Saving success stories:", stories);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const sortedStories = [...stories].sort((a, b) => a.order - b.order);

  return {
    isEditing,
    saving,
    stories: sortedStories,
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
  };
};
