"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, Loader2, Monitor, Tablet, Smartphone } from "lucide-react";
import CustomHeader from "@/components/shared/CustomHeader";
import HeroPreview from "./_components/HeroPreview";
import HeroEditForm from "./_components/HeroEditForm";
import { HeroContent } from "@/constants/admin";

const HeroEditPage = () => {
  const router = useRouter();

  // State for hero content
  const [heroContent, setHeroContent] = useState<HeroContent>(HeroContent);

  // Form states
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    overlayOpacity: 40,
    textColor: "light",
  });

  // Button editing
  const [buttonFormData, setButtonFormData] = useState({
    text: "",
    link: "",
    variant: "default" as
      | "default"
      | "secondary"
      | "outline"
      | "ghost"
      | "link",
  });
  const [editingButtonId, setEditingButtonId] = useState<string | null>(null);

  // Loading states
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Image preview
  const [imagePreview, setImagePreview] = useState<string>("");

  // Device preview mode
  const [previewMode, setPreviewMode] = useState<
    "desktop" | "tablet" | "mobile"
  >("desktop");

  // Initialize form
  useEffect(() => {
    setFormData({
      title: heroContent.title,
      subtitle: heroContent.subtitle,
      overlayOpacity: heroContent.overlayOpacity,
      textColor: heroContent.textColor,
    });
    setImagePreview(heroContent.backgroundImage);
  }, [heroContent]);

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle button input changes
  const handleButtonInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setButtonFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setButtonFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle image upload
  const handleImageSelect = (file: File | null) => {
    if (!file) {
      setImagePreview("");
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setImagePreview(result);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  // Add or update button
  const handleButtonSubmit = () => {
    if (!buttonFormData.text.trim() || !buttonFormData.link.trim()) {
      alert("Please fill in button text and link");
      return;
    }

    if (editingButtonId) {
      // Update existing button
      const updatedButtons = heroContent.buttons.map((btn) =>
        btn.id === editingButtonId
          ? {
              ...btn,
              text: buttonFormData.text,
              link: buttonFormData.link,
              variant: buttonFormData.variant,
            }
          : btn
      );
      setHeroContent((prev) => ({ ...prev, buttons: updatedButtons }));
    } else {
      // Add new button
      const newButton: HeroButton = {
        id: Date.now().toString(),
        text: buttonFormData.text,
        link: buttonFormData.link,
        variant: buttonFormData.variant,
        order: heroContent.buttons.length + 1,
      };
      setHeroContent((prev) => ({
        ...prev,
        buttons: [...prev.buttons, newButton],
      }));
    }

    // Reset form
    setButtonFormData({
      text: "",
      link: "",
      variant: "default",
    });
    setEditingButtonId(null);
  };

  // Edit button
  const handleEditButton = (button: HeroButton) => {
    setButtonFormData({
      text: button.text,
      link: button.link,
      variant: button.variant,
    });
    setEditingButtonId(button.id);
  };

  // Delete button
  const handleDeleteButton = (buttonId: string) => {
    const updatedButtons = heroContent.buttons
      .filter((btn) => btn.id !== buttonId)
      .map((btn, index) => ({ ...btn, order: index + 1 }));
    setHeroContent((prev) => ({ ...prev, buttons: updatedButtons }));
  };

  // Cancel edit button
  const handleCancelEdit = () => {
    setButtonFormData({
      text: "",
      link: "",
      variant: "default",
    });
    setEditingButtonId(null);
  };

  // Save hero content
  const handleSave = async () => {
    setIsSaving(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update hero content
      const updatedHeroContent: HeroContent = {
        ...heroContent,
        ...formData,
        backgroundImage: imagePreview,
      };

      setHeroContent(updatedHeroContent);

      // In real app, save to database here
      console.log("Saving hero content:", updatedHeroContent);

      alert("Hero content saved successfully!");
      router.push("/admin/hero");
    } catch (error) {
      console.error("Error saving hero content:", error);
      alert("Failed to save hero content. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container max-h-screen overflow-auto mx-auto p-4 md:p-6 md:pb-32">
      {/* Header */}

      <CustomHeader
        title="Edit Hero Section"
        description="update the main hero section of your website "
        backLink="./"
      >
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </CustomHeader>

      <div className="space-y-8 mt-4">
        {/* Preview Card */}
        <Card className="sticky top-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Live Preview</CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant={previewMode === "desktop" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setPreviewMode("desktop")}
                >
                  <Monitor className="h-4 w-4" />
                </Button>
                <Button
                  variant={previewMode === "tablet" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setPreviewMode("tablet")}
                >
                  <Tablet className="h-4 w-4" />
                </Button>
                <Button
                  variant={previewMode === "mobile" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setPreviewMode("mobile")}
                >
                  <Smartphone className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <div className="flex justify-center mb-4">
                <div className="bg-gray-100 dark:bg-gray-600 rounded-full px-3 py-1 text-sm font-medium">
                  {previewMode === "desktop" && "Desktop Preview"}
                  {previewMode === "tablet" && "Tablet Preview"}
                  {previewMode === "mobile" && "Mobile Preview"}
                </div>
              </div>

              <div className="bg-gray-900 p-6 rounded-lg">
                <HeroPreview
                  title={formData.title}
                  subtitle={formData.subtitle}
                  backgroundImage={imagePreview}
                  overlayOpacity={formData.overlayOpacity}
                  textColor={formData.textColor}
                  buttons={heroContent.buttons}
                  previewMode={previewMode}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-8 mt-8">
        {/* Edit Form */}
        <HeroEditForm
          formData={formData}
          buttonFormData={buttonFormData}
          editingButtonId={editingButtonId}
          heroContent={heroContent}
          imagePreview={imagePreview}
          onInputChange={handleInputChange}
          onButtonInputChange={handleButtonInputChange}
          onImageSelect={handleImageSelect}
          onButtonSubmit={handleButtonSubmit}
          onEditButton={handleEditButton}
          onDeleteButton={handleDeleteButton}
          onCancelEdit={handleCancelEdit}
          setFormData={setFormData}
        />
      </div>
    </div>
  );
};

export default HeroEditPage;
