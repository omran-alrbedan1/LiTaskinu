// src/app/admin/[locale]/terms-conditions/page.tsx
"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/admin/shared";
import { Save, Edit3, FileText } from "lucide-react";
import { useTermsManagement } from "@/hooks/useTermsManagement";
import TermsList from "./_components/TermsList ";

const TermsConditionsPage = () => {
  const {
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
  } = useTermsManagement();

  const [headerData, setHeaderData] = useState({
    title: "Terms & Conditions",
    lastUpdated: "January 1, 2024",
  });

  const handleHeaderUpdate = (
    field: keyof typeof headerData,
    value: string
  ) => {
    setHeaderData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="mx-auto pb-32 p-6 max-h-[90vh] sidebar-scrollbar overflow-auto">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <Header
          title="Manage Terms & Conditions"
          description="Add, edit, and manage terms and conditions sections for your platform"
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
                onClick={saveSections}
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
              className="flex items-center gap-2 text-white bg-primary-color1"
            >
              <Edit3 className="w-4 h-4" />
              Edit Content
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Main Header Card */}
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary-color1" />
              Terms & Conditions Header
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Terms Title
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={headerData.title}
                    onChange={(e) =>
                      handleHeaderUpdate("title", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:ring-2 focus:!outline-none focus:ring-primary-color1"
                    placeholder="Enter terms title..."
                  />
                ) : (
                  <h2 className="text-2xl font-bold p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border">
                    {headerData.title}
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
                    value={headerData.lastUpdated}
                    onChange={(e) =>
                      handleHeaderUpdate("lastUpdated", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-800 dark:text-white focus:ring-2 focus:!outline-none focus:ring-primary-color1"
                    placeholder="Enter last updated date..."
                  />
                ) : (
                  <p className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border text-gray-600 dark:text-gray-400">
                    Last updated: {headerData.lastUpdated}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dynamic Sections */}
        <TermsList
          sections={sections}
          isEditing={isEditing}
          onAddSection={addNewSection}
          onUpdateSection={updateSection}
          onRemoveSection={removeSection}
        />
      </div>
    </div>
  );
};

export default TermsConditionsPage;
