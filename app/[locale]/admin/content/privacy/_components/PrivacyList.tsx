// components/admin/privacy/PrivacyList.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Plus } from "lucide-react";
import { PrivacySection } from "./PrivacySection";

interface PrivacySectionType {
  id: string;
  order: number;
  title: string;
  content: string;
}

interface PrivacyListProps {
  sections: PrivacySectionType[];
  isEditing: boolean;
  onAddSection: () => void;
  onUpdateSection: (
    id: string,
    field: keyof PrivacySectionType,
    value: string
  ) => void;
  onRemoveSection: (id: string) => void;
}

const PrivacyList: React.FC<PrivacyListProps> = ({
  sections,
  isEditing,
  onAddSection,
  onUpdateSection,
  onRemoveSection,
}) => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary-color1" />
          Privacy Policy Sections
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            ({sections.length} sections)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {sections.map((section, index) => (
          <PrivacySection
            key={section.id}
            section={section}
            index={index}
            isEditing={isEditing}
            totalSections={sections.length}
            onUpdate={onUpdateSection}
            onRemove={onRemoveSection}
          />
        ))}

        {isEditing && (
          <div className="flex justify-center pt-4">
            <Button
              onClick={onAddSection}
              className="flex items-center gap-2"
              variant="outline"
            >
              <Plus className="w-4 h-4" />
              Add New Section (#{sections.length + 1})
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  </div>
);

export default PrivacyList;
