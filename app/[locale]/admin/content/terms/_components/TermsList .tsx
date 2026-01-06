// components/admin/terms/TermsList.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";
import { TermsSection } from "./TermsSection";

interface TermsListProps {
  sections: TermsSectionType[];
  isEditing: boolean;
  onAddSection: () => void;
  onUpdateSection: (
    id: string,
    field: keyof TermsSectionType,
    value: string
  ) => void;
  onRemoveSection: (id: string) => void;
}

const TermsList: React.FC<TermsListProps> = ({
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
          <FileText className="w-5 h-5 text-primary-color1" />
          Terms & Conditions Sections
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            ({sections.length} sections)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {sections.map((section, index) => (
          <TermsSection
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

export default TermsList;
