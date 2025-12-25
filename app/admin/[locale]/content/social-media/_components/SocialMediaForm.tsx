    "use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, Plus, Save, User } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField, {
  FormFieldType,
} from "@/components/shared/CustomInput";
import SubmitButton from "@/components/Buttons/SubmitButton";
import CustomUpload from "@/components/shared/CustomUpload";
import { SocialMediaFormValidation, SocialMediaFormValues } from "@/validation/admin";
import { ICONS } from "@/constants/icons";

interface SocialMediaFormProps {
  onSubmit: (data: SocialMedia) => Promise<void> | void;

  onCancel: () => void;
  isLoading?: boolean;
  initialData?: SocialMedia | null;
  isEdit?: boolean;
}

export function SocialMediaForm({
  onSubmit,
  onCancel,
  isLoading = false,
  initialData,
  isEdit = false,
}: SocialMediaFormProps) {
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string>(
    initialData?.icon
      ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${initialData.icon}`
      : ""
  );

const form = useForm<SocialMediaFormValues>({
  resolver: zodResolver(SocialMediaFormValidation),
  values: isEdit && initialData
    ? {
        name: initialData.name,
        type: initialData.type as "social" | "contact",
        value: initialData.value,
        icon: initialData.icon,
        is_active: initialData.is_active,
      }
    : {
        name: "",
        type: "social",
        value: "",
        icon: "",
        is_active: true,
      },
});


  const handleIconFileSelect = (file: File | null) => {
    setIconFile(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setIconPreview(previewUrl);
      form.setValue("icon", file.name);
    } else {
      setIconPreview("");
      form.setValue("icon", "");
    }
  };

const handleSubmit: SubmitHandler<SocialMediaFormValues> = async (values) => {
  const formData = new FormData();

  formData.append("name", values.name);
  formData.append("type", values.type);
  formData.append("value", values.value);
  formData.append("is_active", values.is_active ? "1" : "0");

    if (iconFile) {
      formData.append("icon", iconFile);
    } else if (values.icon && isEdit) {
      const iconPath = values.icon.includes("/")
        ? values.icon.split("/").pop()!
        : values.icon;
      formData.append("icon", iconPath);
    }

    if (isEdit && initialData?.id) {
      formData.append("id", initialData.id.toString());
    }
    //@ts-ignore
    onSubmit(formData);
  };

  const statusOptions = [
    { value: "true", label: "Active" },
    { value: "false"    , label: "Inactive" },
  ];

  const typeOptions = [
    { value: "social", label: "Social Media" },
    { value: "contact", label: "Contact" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        {/* Basic Info */}
        <Card className="border-blue-100 bg-blue-50/20">
          <CardContent className="p-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-md">
                <User className="w-3 h-3 text-blue-600" />
              </div>
              <h3 className="text-sm font-semibold">Basic Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="name"
                label="Name"
                required
                placeholder="e.g., Facebook"
                iconSrc={ICONS.name}
              />

              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="type"
                label="Type"
                required
                placeholder="Select type"
                options={typeOptions}
                iconSrc={ICONS.name}
              />
            </div>
          </CardContent>
        </Card>

        {/* Link */}
        <Card className="border-green-100 bg-green-50/20">
          <CardContent className="p-2">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="value"
              label="URL"
              required
              placeholder="https://example.com"
              iconSrc={ICONS.link}
            />

          <p className="flex items-center gap-1 my-2">
                <span className="mb-2 font-medium text-foreground">
                    Icon
                </span>
                <span className="text-destructive text-xl -mt-1">*</span>
              </p>
            <CustomUpload
              onFileSelect={handleIconFileSelect}
              acceptedFileTypes="image/*"
              maxFileSize={2}
              previewUrl={iconPreview}
              label="Upload icon"
              required
            />
          </CardContent>
        </Card>

        {/* Status */}
        <Card className="border-purple-100 bg-purple-50/20">
          <CardContent className="p-2">
            <CustomFormField
              fieldType={FormFieldType.RADIO}
              control={form.control}
              name="is_active"
              label="Status"
              options={statusOptions}
            />
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>

          <SubmitButton
            isLoading={isLoading}
            loadingText={isEdit ? "Updating..." : "Creating..."}
            icon={isEdit ? Save : Plus}
            disabled={!iconFile && !iconPreview && !isEdit}
          >
            {isEdit ? "Update Link" : "Create Link"}
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
}
