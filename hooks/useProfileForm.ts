import { INITIAL_PERSONAL_DATA } from "@/constants/temporary";
import { useState, useCallback } from "react";

export const useProfileForm = () => {
  const [formData, setFormData] = useState<FormData>(INITIAL_PERSONAL_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = useCallback(
    (section: string, field: string, value: string) => {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section as keyof FormData],
          [field]: value,
        },
      }));
      // Clear error when user makes changes
      setError(null);
    },
    []
  );

  const handleCheckboxChange = useCallback(
    (section: string, field: string, value: string, checked: boolean) => {
      setFormData((prev) => {
        const currentSection = prev[section as keyof FormData];
        const currentArray =
          (currentSection[field as keyof typeof currentSection] as string[]) ||
          [];

        const updatedArray = checked
          ? [...currentArray, value]
          : currentArray.filter((item) => item !== value);

        return {
          ...prev,
          [section]: {
            ...currentSection,
            [field]: updatedArray,
          },
        };
      });
      setError(null);
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Validate form data
      if (!validateFormData(formData)) {
        throw new Error("Please fill in all required fields");
      }

      console.log("Saving personal data:", formData);
      // Here you would typically make an API call
      // await api.updateProfile(formData);

      alert("Profile updated successfully!");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error updating profile";
      setError(errorMessage);
      console.error("Profile update failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const validateFormData = (data: FormData): boolean => {
    // Add your validation logic here
    return !!data.basicInfo.age && !!data.basicInfo.gender;
  };

  return {
    formData,
    isLoading,
    error,
    handleInputChange,
    handleCheckboxChange,
    handleSubmit,
  };
};
