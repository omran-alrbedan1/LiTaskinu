// app/admin/hero/edit/_components/HeroEditForm.tsx
"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CustomUpload from "@/components/shared/CustomUpload";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LinkIcon, Trash2, Check, Plus } from "lucide-react";

interface HeroEditFormProps {
  formData: {
    title: string;
    subtitle: string;
    overlayOpacity: number;
    textColor: string;
  };
  buttonFormData: {
    text: string;
    link: string;
    variant: "default" | "secondary" | "outline" | "ghost" | "link";
    isExternal?: boolean;
  };
  editingButtonId: string | null;
  heroContent: {
    buttons: HeroButton[];
  };
  imagePreview: string;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onButtonInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageSelect: (file: File | null) => void;
  onButtonSubmit: () => void;
  onEditButton: (button: HeroButton) => void;
  onDeleteButton: (buttonId: string) => void;
  onCancelEdit: () => void;
  setFormData: React.Dispatch<
    React.SetStateAction<{
      title: string;
      subtitle: string;
      overlayOpacity: number;
      textColor: string;
    }>
  >;
}

const HeroEditForm: React.FC<HeroEditFormProps> = ({
  formData,
  buttonFormData,
  editingButtonId,
  heroContent,
  imagePreview,
  onInputChange,
  onButtonInputChange,
  onImageSelect,
  onButtonSubmit,
  onEditButton,
  onDeleteButton,
  onCancelEdit,
  setFormData,
}) => {
  return (
    <div className="space-y-8">
      {/* Content Card */}
      <Card>
        <CardHeader>
          <CardTitle>Content</CardTitle>
          <CardDescription>
            Update the text content of your hero section
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Hero Title *</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={onInputChange}
              placeholder="Enter hero title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtitle">Hero Subtitle *</Label>
            <Textarea
              id="subtitle"
              name="subtitle"
              value={formData.subtitle}
              onChange={onInputChange}
              placeholder="Enter hero subtitle"
              rows={3}
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Appearance Card */}
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize how your hero section looks
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label htmlFor="overlayOpacity">
                  Background Overlay Opacity
                </Label>
                <span className="font-medium">{formData.overlayOpacity}%</span>
              </div>
              <input
                type="range"
                id="overlayOpacity"
                name="overlayOpacity"
                min="0"
                max="100"
                value={formData.overlayOpacity}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    overlayOpacity: parseInt(e.target.value),
                  }))
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>No overlay</span>
                <span>Default (40%)</span>
                <span>Full overlay</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Background Image Card */}
      <Card>
        <CardHeader>
          <CardTitle>Background Image</CardTitle>
          <CardDescription>
            Upload a background image for your hero section
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <CustomUpload
              onFileSelect={onImageSelect}
              acceptedFileTypes="image/*"
              maxFileSize={5}
              previewUrl={imagePreview}
              label="Upload background image"
              description="PNG, JPG, GIF up to 5MB"
              required={false}
            />
          </div>
        </CardContent>
      </Card>

      {/* Buttons Card */}
      <Card>
        <CardHeader>
          <CardTitle>Call-to-Action Buttons</CardTitle>
          <CardDescription>
            Add buttons to guide users through your platform
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Button Form */}
            <div className="border rounded-lg p-4 space-y-4">
              <h3 className="font-medium">
                {editingButtonId ? "Edit Button" : "Add New Button"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="buttonText">Button Text *</Label>
                  <Input
                    id="buttonText"
                    name="text"
                    value={buttonFormData.text}
                    onChange={onButtonInputChange}
                    placeholder="e.g., Get Started"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="buttonLink">Button Link *</Label>
                  <Input
                    id="buttonLink"
                    name="link"
                    value={buttonFormData.link}
                    onChange={onButtonInputChange}
                    placeholder="e.g., /signup"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                {editingButtonId && (
                  <Button variant="outline" onClick={onCancelEdit}>
                    Cancel Edit
                  </Button>
                )}
                <Button onClick={onButtonSubmit}>
                  {editingButtonId ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Update Button
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Button
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Buttons List */}
            <div className="space-y-3">
              <h3 className="font-medium">Current Buttons</h3>
              {heroContent.buttons.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  No buttons added yet
                </p>
              ) : (
                <div className="space-y-3">
                  {heroContent.buttons.map((button) => (
                    <div
                      key={button.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-4">
                        <Badge variant="outline">#{button.order}</Badge>
                        <div>
                          <div className="font-medium">{button.text}</div>
                          <div className="text-sm text-gray-500 flex items-center gap-1">
                            <LinkIcon className="h-3 w-3" />
                            {button.link}
                          </div>
                        </div>
                        <Badge variant="secondary" className="capitalize">
                          {button.variant}
                        </Badge>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onEditButton(button)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => onDeleteButton(button.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HeroEditForm;
