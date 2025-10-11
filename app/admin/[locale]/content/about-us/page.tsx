"use client";
import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/admin/shared";
import { Save, Eye, Edit3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import dynamic from "next/dynamic";

// Dynamically import React Quill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <div className="h-48 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"></div>
  ),
});

import "react-quill/dist/quill.snow.css";

// Memoized RichTextSection component
const RichTextSection = React.memo(
  ({
    title,
    value,
    onChange,
    placeholder,
    isEditing,
  }: {
    title: string;
    value: string;
    onChange: (value: string) => void;
    placeholder: string;
    isEditing: boolean;
  }) => {
    // React Quill modules configuration
    const modules = {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        ["link", "image", "video"],
        ["blockquote", "code-block"],
        ["clean"],
      ],
    };

    const formats = [
      "header",
      "font",
      "size",
      "bold",
      "italic",
      "underline",
      "strike",
      "color",
      "background",
      "list",
      "bullet",
      "align",
      "link",
      "image",
      "video",
      "blockquote",
      "code-block",
    ];

    return (
      <div className="space-y-3">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {title}
        </label>
        {isEditing ? (
          <ReactQuill
            value={value}
            onChange={onChange}
            modules={modules}
            formats={formats}
            placeholder={placeholder}
            theme="snow"
            className="bg-white dark:bg-gray-800 rounded-lg"
          />
        ) : (
          <div
            className="ql-editor p-4 border rounded-lg bg-gray-50 dark:bg-gray-800 min-h-[200px] prose dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: value }}
          />
        )}
      </div>
    );
  }
);

RichTextSection.displayName = "RichTextSection";

const AboutUsPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState({
    title: "About Islamic Marriage Platform",
    mainContent: `
      <h2>Welcome to Islamic Marriage Platform</h2>
      <p>The leading platform in the Arab world for legitimate marriage according to Islamic teachings.</p>
      
      <h3>🏛️ <strong>Our Mission:</strong></h3>
      <p>We strive to facilitate paths to legitimate marriage while maintaining the highest standards of security and privacy, applying Islamic guidelines throughout all stages of acquaintance and marriage.</p>
      
      <h3>🎯 <strong>Our Vision:</strong></h3>
      <p>To be the trusted first platform for Islamic marriage in the Arab world, contributing to building a cohesive Islamic society and stable families.</p>
      
      <h3>💫 <strong>Our Values:</strong></h3>
      <ul>
        <li>Full commitment to Islamic Sharia</li>
        <li>Preserving dignity and privacy</li>
        <li>Honesty and transparency</li>
        <li>Quality and professionalism</li>
        <li>Trust and security</li>
      </ul>
    `,
    mission: `
      <p>We believe that <strong>marriage completes half of one's faith</strong>, and we work diligently to provide a safe and reliable environment for those seeking marriage according to Islamic guidelines.</p>
      <p>We facilitate the process of legitimate acquaintance under the supervision of guardians, while maintaining Islamic values and principles.</p>
    `,
    vision: `
      <p>To be <strong>pioneers</strong> in providing electronic marriage services committed to Allah's Sharia, and to be a good support for Muslims in establishing stable families according to Islamic methodology.</p>
    `,
  });

  // Use useCallback for change handlers
  const handleMainContentChange = useCallback((value: string) => {
    setContent((prev) => ({ ...prev, mainContent: value }));
  }, []);

  const handleMissionChange = useCallback((value: string) => {
    setContent((prev) => ({ ...prev, mission: value }));
  }, []);

  const handleVisionChange = useCallback((value: string) => {
    setContent((prev) => ({ ...prev, vision: value }));
  }, []);

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setContent((prev) => ({ ...prev, title: e.target.value }));
    },
    []
  );

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call to save content
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    setIsEditing(false);
    // In real app: await saveAboutUsContent(content);
    console.log("Saving content:", content);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset content or fetch from API
  };

  return (
    <div className="mx-auto pb-32 p-6 max-h-screen sidebar-scrollbar overflow-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <Header
          title="Manage About Us Page"
          description="Edit the content of the About Us page that appears to users on the website"
        />
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2"
            >
              <Edit3 className="w-4 h-4" />
              Edit Content
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Main Content Editor */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-primary-600" />
                Main Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Main Title
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={content.title.replace(/<[^>]*>/g, "")}
                    onChange={handleTitleChange}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter main title..."
                  />
                ) : (
                  <h2 className="text-2xl font-bold p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                    {content.title.replace(/<[^>]*>/g, "")}
                  </h2>
                )}
              </div>

              <RichTextSection
                title="Main Content"
                value={content.mainContent}
                onChange={handleMainContentChange}
                placeholder="Write main content about the platform..."
                isEditing={isEditing}
              />
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <RichTextSection
                title="Mission"
                value={content.mission}
                onChange={handleMissionChange}
                placeholder="Write the platform's mission..."
                isEditing={isEditing}
              />

              <RichTextSection
                title="Vision"
                value={content.vision}
                onChange={handleVisionChange}
                placeholder="Write the platform's vision..."
                isEditing={isEditing}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
