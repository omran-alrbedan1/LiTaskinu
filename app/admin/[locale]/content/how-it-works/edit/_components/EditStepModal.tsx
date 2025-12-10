"use client";
import React, { useEffect } from "react";
import { Modal } from "antd";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomFormField, {
  FormFieldType,
} from "@/components/shared/CustomInput";
import SubmitButton from "@/components/Buttons/SubmitButton";
import { stepSchema } from "@/validation/admin";
import { Edit } from "lucide-react";

type StepFormValues = z.infer<typeof stepSchema>;

interface EditStepModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (values: StepFormValues) => Promise<void>;
  step: Step | null;
  loading?: boolean;
}

const EditStepModal: React.FC<EditStepModalProps> = ({
  isOpen,
  onClose,
  onUpdate,
  step,
  loading = false,
}) => {
  // Initialize form
  const form = useForm<StepFormValues>({
    resolver: zodResolver(stepSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    if (isOpen && step) {
      form.reset({
        title: step.title,
        description: step.description,
      });
    } else if (!isOpen) {
      form.reset();
    }
  }, [isOpen, step, form]);

  // Handle form submission
  const onSubmit = async (values: StepFormValues) => {
    try {
      await onUpdate(values);
      onClose();
    } catch (error) {
      // Error is handled in parent component
    }
  };

  // Handle cancel
  const handleCancel = () => {
    form.reset();
    onClose();
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <Edit className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Edit Step</h3>
            <p className="text-sm text-gray-500">Update step details</p>
          </div>
        </div>
      }
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      width={600}
      destroyOnClose
      className="ant-modal-custom"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="title"
            label="Step Title"
            placeholder="e.g., Create Account"
            required
            disabled={loading}
          />

          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="description"
            label="Description"
            placeholder="Describe what users need to do in this step"
            required
            disabled={loading}
          />

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </Button>
            <SubmitButton
              isLoading={loading}
              loadingText="Updating..."
              type="submit"
              disabled={loading || !form.formState.isValid}
            >
              Update Step
            </SubmitButton>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default EditStepModal;
