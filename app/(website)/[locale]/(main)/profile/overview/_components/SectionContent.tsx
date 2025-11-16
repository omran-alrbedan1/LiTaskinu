import React from "react";
import { Label } from "@/components/ui/label";
import { FieldRenderer } from "./FieldRenderer";

interface SectionContentProps {
  section: SectionConfig;
  formData: FormData;
  onInputChange: (section: string, field: string, value: string) => void;
  onCheckboxChange: (
    section: string,
    field: string,
    value: string,
    checked: boolean
  ) => void;
}

export const SectionContent: React.FC<SectionContentProps> = ({
  section,
  formData,
  onInputChange,
  onCheckboxChange,
}) => (
  <div className="grid grid-cols-1 gap-6">
    {section.fields.map((field) => (
      <div key={field.key} className="space-y-3">
        <Label className=" text-base ">{field.label}</Label>
        <FieldRenderer
          section={section.id}
          field={field}
          formData={formData}
          onInputChange={onInputChange}
          onCheckboxChange={onCheckboxChange}
        />
      </div>
    ))}
  </div>
);
