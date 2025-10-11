"use client";
import React, { useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/admin/shared";
import { Save, Edit3, Shield } from "lucide-react";
import { RichTextSection } from "@/components/shared";
import { initialPrivacyContent } from "@/constants/temporary";

const PrivacyPolicyPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<PrivacyContent>(initialPrivacyContent);

  // Generic update handler for all sections
  const handleContentUpdate = useCallback(
    (section: keyof PrivacyContent, value: string) => {
      setContent((prev) => ({ ...prev, [section]: value }));
    },
    []
  );

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call to save content
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    setIsEditing(false);
    // In real app: await savePrivacyContent(content);
    console.log("Saving privacy policy content:", content);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset content to initial state
    setContent(initialPrivacyContent);
  };

  // Define sections for easier management
  const sections = [
    { key: "introduction", title: "Introduction" },
    { key: "informationCollection", title: "Information Collection" },
    { key: "informationUsage", title: "Information Usage" },
    { key: "informationSharing", title: "Information Sharing" },
    { key: "dataSecurity", title: "Data Security" },
    { key: "userRights", title: "User Rights" },
    { key: "retention", title: "Data Retention" },
    { key: "changes", title: "Changes to Policy" },
    { key: "contact", title: "Contact Information" },
  ] as const;

  return (
    <div className="mx-auto pb-32 p-6 max-h-screen sidebar-scrollbar overflow-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <Header
          title="Manage Privacy Policy"
          description="Edit the Privacy Policy content that appears to users on the website"
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
                className="flex items-center gap-2 bg-primary-color1 text-white"
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              className="flex items-center text-white gap-2 bg-primary-color1"
            >
              <Edit3 className="w-4 h-4" />
              Edit Content
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-6">
          {/* Main Header Card */}
          <Card className="">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary-color1" />
                Privacy Policy Header
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Policy Title
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={content.title}
                      onChange={(e) =>
                        handleContentUpdate("title", e.target.value)
                      }
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:ring-2 focus:outline-none focus:ring-primary-color1 focus:!border-transparent"
                      placeholder="Enter policy title..."
                    />
                  ) : (
                    <h2 className="text-2xl font-bold p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                      {content.title}
                    </h2>
                  )}
                </div>
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Last Updated Date
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={content.lastUpdated}
                      onChange={(e) =>
                        handleContentUpdate("lastUpdated", e.target.value)
                      }
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-primary-color1 focus:outline-none focus:border-transparent"
                      placeholder="Enter last updated date..."
                    />
                  ) : (
                    <p className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border text-gray-600 dark:text-gray-400">
                      Last updated: {content.lastUpdated}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dynamic Sections */}
          {sections.map((section) => (
            <Card key={section.key} className="">
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <RichTextSection
                  title={`${section.title} Section`}
                  value={content[section.key]}
                  onChange={(value) => handleContentUpdate(section.key, value)}
                  placeholder={`Write the ${section.title.toLowerCase()}...`}
                  isEditing={isEditing}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
