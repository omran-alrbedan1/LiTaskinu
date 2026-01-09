import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FieldRendererProps {
  section: string;
  field: FieldConfig;
  formData: FormData;
  onInputChange: (section: string, field: string, value: string) => void;
  onCheckboxChange: (
    section: string,
    field: string,
    value: string,
    checked: boolean
  ) => void;
}

export const FieldRenderer: React.FC<FieldRendererProps> = ({
  section,
  field,
  formData,
  onInputChange,
  onCheckboxChange,
}) => {
  const currentValue =
    formData[section as keyof FormData][
      field.key as keyof (typeof formData)[keyof FormData]
    ];

  const renderRadioField = () => (
    <RadioGroup
      value={(currentValue as string) || ""}
      onValueChange={(value) => onInputChange(section, field.key, value)}
      className={`grid grid-cols-1 md:grid-cols-3 gap-2`}
    >
      {field.options?.map((option) => (
        <div key={option} className="flex items-center space-x-2">
          <RadioGroupItem
            value={option}
            id={`${section}-${field.key}-${option}`}
            aria-label={option}
          />
          <Label
            htmlFor={`${section}-${field.key}-${option}`}
            className="cursor-pointer text-sm"
          >
            {option}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );

  const renderCheckboxField = () => {
    const currentArray = Array.isArray(currentValue) ? currentValue : [];

    return (
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-3`}>
        {field.options?.map((option: string) => (
          <div key={option} className="flex items-center space-x-2">
            <Checkbox
              id={`${section}-${field.key}-${option}`}
              //@ts-ignore
              checked={currentArray.includes(option)}
              onCheckedChange={(checked) =>
                onCheckboxChange(section, field.key, option, checked as boolean)
              }
              aria-label={option}
            />
            <Label
              htmlFor={`${section}-${field.key}-${option}`}
              className="cursor-pointer text-sm"
            >
              {option}
            </Label>
          </div>
        ))}
      </div>
    );
  };

  const renderSelectField = () => (
    <select
      value={(currentValue as string) || ""}
      onChange={(e) => onInputChange(section, field.key, e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color1 focus:border-transparent"
      aria-label={field.label}
    >
      <option value="">Select {field.label}</option>
      {field.options?.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );

  const renderInputField = () => (
    <input
      type={field.type}
      value={(currentValue as string) || ""}
      onChange={(e) => onInputChange(section, field.key, e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-color1 focus:border-transparent"
      aria-label={field.label}
    />
  );

  switch (field.type) {
    case "radio":
      return renderRadioField();
    case "checkbox":
      return renderCheckboxField();
    case "select":
      return renderSelectField();
    default:
      return renderInputField();
  }
};
