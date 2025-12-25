"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HelpCircle, Save, Plus } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import CustomFormField, {
  FormFieldType,
} from "@/components/shared/CustomInput";
import SubmitButton from "@/components/Buttons/SubmitButton";
import { FAQFormValidation, FAQFormValues } from "@/validation/admin";
import { ICONS } from "@/constants/icons";


interface FAQFormProps {
  onSubmit: (data: FAQ) => Promise<void> | void;
  onCancel: () => void;
  isLoading?: boolean;
  initialData?: FAQ | null;
  isEdit?: boolean;
}

 const  FAQForm=({
  onSubmit,
  onCancel,
  isLoading = false,
  initialData,
  isEdit = false,
}: FAQFormProps) =>{
  const form = useForm<FAQFormValues>({
    resolver: zodResolver(FAQFormValidation),
    values: isEdit && initialData
      ? {
          question: initialData.question,
          answer: initialData.answer,
          is_active: initialData.is_active,
        }
      : {
          question: "",
          answer: "",
          is_active: true,
        },
  });

  const handleSubmit: SubmitHandler<FAQFormValues> = async (values) => {
    const faqData = {
      ...values,
      ...(isEdit && initialData ? { id: initialData.id } : {}),
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
        <Card className="border-blue-100 bg-blue-50/20 mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-md">
                <HelpCircle className="w-3 h-3 text-blue-600" />
              </div>
              <h3 className="text-sm font-semibold">Question</h3>
            </div>

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="question"
              label="Question"
              required
              placeholder="Enter the frequently asked question"
              iconSrc={ICONS.question}
              rows={3}
            />
          </CardContent>
        </Card>

        {/* Answer Section */}
        <Card className="border-green-100 bg-green-50/20 mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-6 h-6 bg-green-100 rounded-md">
                <HelpCircle className="w-3 h-3 text-green-600" />
              </div>
              <h3 className="text-sm font-semibold">Answer</h3>
            </div>

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="answer"
              label="Answer"
              required
              placeholder="Enter the detailed answer"
              iconSrc={ICONS.answer}
              rows={6}
            />
          </CardContent>
        </Card>

        {/* Status Section */}
        <Card className="border-purple-100 bg-purple-50/20 mb-6">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-6 h-6 bg-purple-100 rounded-md">
                <HelpCircle className="w-3 h-3 text-purple-600" />
              </div>
              <h3 className="text-sm font-semibold">Status</h3>
            </div>

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
          >
            {isEdit ? "Update FAQ" : "Create FAQ"}
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
}
export default FAQForm