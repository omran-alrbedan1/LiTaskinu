"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Save, Plus } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import CustomFormField, {
  FormFieldType,
} from "@/components/shared/CustomInput";
import SubmitButton from "@/components/Buttons/SubmitButton";
import { FAQFormValidation, FAQFormValues } from "@/validation/admin";



interface FAQFormProps {
  onSubmit: (data: FAQ) => Promise<void> | void;
  onCancel: () => void;
  isLoading?: boolean;
  initialData?: FAQ | null;
  isEdit?: boolean;
}
const FAQForm = ({
  onSubmit,
  onCancel,
  isLoading = false,
  initialData,
  isEdit = false,
}: FAQFormProps) => {
 const form = useForm<FAQFormValues>({
  resolver: zodResolver(FAQFormValidation),
  defaultValues: {
    question: "",
    answer: "",
    is_active: "true",
  },
  values: isEdit && initialData
    ? {
        question: initialData.question,
        answer: initialData.answer,
        is_active: initialData.is_active ? "true" : "false",
      }
    : undefined,
});


const handleSubmit: SubmitHandler<FAQFormValues> = async (values) => {
  const faqData: FAQ = {
    ...(isEdit && initialData ? { id: initialData.id } : {}),
    question: values.question,
    answer: values.answer,
    is_active: values.is_active === "true",
  };

  await onSubmit(faqData);
};


  const statusOptions = [
    { value: "true", label: "Active" },
    { value: "false", label: "Inactive" },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        {/* Question Section */}
        <Card className="border-blue-100 bg-blue-50/20 mb-1">
          <CardContent className="p-2">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="question"
              label="Question"
              required
              placeholder="Enter the frequently asked question"
            />
          </CardContent>
        </Card>

        {/* Answer Section */}
        <Card className="border-green-100 bg-green-50/20 mb-1">
          <CardContent className="p-2">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="answer"
              label="Answer"
              required
              placeholder="Enter the detailed answer"
            />
          </CardContent>
        </Card>

        {/* Status Section */}
        <Card className="border-purple-100 bg-purple-50/20 mb-1">
          <CardContent className="p-2">
            <CustomFormField
              fieldType={FormFieldType.RADIO}
              control={form.control}
              name="is_active"
              label="Status"
              options={statusOptions}
              orientation="horizontal"
            />
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            className="px-6"
          >
            Cancel
          </Button>
          <SubmitButton
            isLoading={isLoading}
            loadingText={isEdit ? "Updating..." : "Creating..."}
            icon={isEdit ? Save : Plus}
            className="px-6"
          >
            {isEdit ? "Update FAQ" : "Create FAQ"}
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
};

export default FAQForm;