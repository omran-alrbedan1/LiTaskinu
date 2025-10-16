import { useState, useCallback } from "react";

export interface PrivacySection {
  id: string;
  order: number;
  title: string;
  content: string;
}

interface PrivacyManagementReturn {
  isEditing: boolean;
  saving: boolean;
  sections: PrivacySection[];
  actions: {
    setIsEditing: (editing: boolean) => void;
    addNewSection: () => void;
    removeSection: (id: string) => void;
    updateSection: (
      id: string,
      field: keyof PrivacySection,
      value: string
    ) => void;
    saveSections: () => Promise<void>;
    cancelEditing: () => void;
  };
}

export const usePrivacyManagement = (): PrivacyManagementReturn => {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [sections, setSections] = useState<PrivacySection[]>([
    {
      id: "1",
      order: 1,
      title: "Introduction",
      content:
        "<p>Welcome to our Privacy Policy. This policy describes how we collect, use, and protect your personal information.</p>",
    },
    {
      id: "2",
      order: 2,
      title: "Information Collection",
      content:
        "<p>We collect information that you provide directly to us when using our platform.</p>",
    },
  ]);

  const addNewSection = useCallback(() => {
    const newSection: PrivacySection = {
      id: Date.now().toString(),
      order: sections.length + 1,
      title: `New Section ${sections.length + 1}`,
      content: "<p>Enter section content here...</p>",
    };
    setSections((prev) => [...prev, newSection]);
  }, [sections.length]);

  const removeSection = useCallback((id: string) => {
    setSections((prev) => {
      const filtered = prev.filter((section) => section.id !== id);
      // Reorder remaining sections
      return filtered.map((section, index) => ({
        ...section,
        order: index + 1,
      }));
    });
  }, []);

  const updateSection = useCallback(
    (id: string, field: keyof PrivacySection, value: string) => {
      setSections((prev) =>
        prev.map((section) =>
          section.id === id ? { ...section, [field]: value } : section
        )
      );
    },
    []
  );

  const saveSections = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Saving privacy sections:", sections);
    setSaving(false);
    setIsEditing(false);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    // Optionally: reload original data from API
  };

  return {
    isEditing,
    saving,
    sections,
    actions: {
      setIsEditing,
      addNewSection,
      removeSection,
      updateSection,
      saveSections,
      cancelEditing,
    },
  };
};
