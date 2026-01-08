"use client";

import React from "react";
import CustomFormField, { FormFieldType } from "@/components/shared/CustomInput";

interface SectionContentProps {
  section: any;
  control: any;
}

export const SectionContent: React.FC<SectionContentProps> = ({
  section,
  control,
}) => {
  const getFieldType = (field: any): FormFieldType => {
    switch (field.type) {
      case "radio":
        return FormFieldType.RADIO;
      case "checkbox":
        return FormFieldType.CHECKBOX;
      case "number":
        return FormFieldType.NUMBER;
      case "multiSelect":
        return FormFieldType.MULTI_SELECT;
      case "textarea":
        return FormFieldType.TEXTAREA; 
      case "input":
      default:
        return FormFieldType.INPUT;
    }
  };

  return (
    <div className="grid grid-cols-1  gap-6"> 
      {section?.fields.map((field:any) => {
        const fieldType = getFieldType(field);

        return (
          <div
            key={field.name}
            className={`space-y-3 col-span-1`}
          >
            <CustomFormField
              fieldType={fieldType}
              control={control}
              name={field.name as any}
              label={field.label}
              placeholder={field.placeholder}
              options={field.options}
              orientation={fieldType === FormFieldType.RADIO ? "horizontal" : "vertical"}              
            />
          </div>
        );
      })}
    </div>
  );
};