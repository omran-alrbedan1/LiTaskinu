// hooks/useTermsManagement.ts
import { useState, useCallback } from "react";

export interface TermsSection {
  id: string;
  order: number;
  title: string;
  content: string;
}

interface TermsManagementReturn {
  isEditing: boolean;
  saving: boolean;
  sections: TermsSection[];
  actions: {
    setIsEditing: (editing: boolean) => void;
    addNewSection: () => void;
    removeSection: (id: string) => void;
    updateSection: (
      id: string,
      field: keyof TermsSection,
      value: string
    ) => void;
    saveSections: () => Promise<void>;
    cancelEditing: () => void;
  };
}

export const useTermsManagement = (): TermsManagementReturn => {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [sections, setSections] = useState<TermsSection[]>([
    {
      id: "1",
      order: 1,
      title: "Introduction",
      content:
        "<p>Welcome to our platform. These terms and conditions govern your use of our services.</p>",
    },
    {
      id: "2",
      order: 2,
      title: "Acceptance of Terms",
      content:
        "<p>By accessing and using our platform, you accept and agree to be bound by these terms.</p>",
    },
  ]);

  const addNewSection = useCallback(() => {
    const newSection: TermsSection = {
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
    (id: string, field: keyof TermsSection, value: string) => {
      setSections((prev) =>
        prev.map((section) =>
          section.id === id ? { ...section, [field]: value } : section
        )
      );
    },
    []
  );

  const moveSectionUp = useCallback((index: number) => {
    if (index === 0) return;

    setSections((prev) => {
      const newSections = [...prev];
      [newSections[index - 1], newSections[index]] = [
        newSections[index],
        newSections[index - 1],
      ];

      // Update orders
      return newSections.map((section, idx) => ({
        ...section,
        order: idx + 1,
      }));
    });
  }, []);

  const moveSectionDown = useCallback(
    (index: number) => {
      if (index === sections.length - 1) return;

      setSections((prev) => {
        const newSections = [...prev];
        [newSections[index], newSections[index + 1]] = [
          newSections[index + 1],
          newSections[index],
        ];

        // Update orders
        return newSections.map((section, idx) => ({
          ...section,
          order: idx + 1,
        }));
      });
    },
    [sections.length]
  );

  const saveSections = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Saving sections:", sections);
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
