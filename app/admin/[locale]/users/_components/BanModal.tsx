"use client";

import React from "react";
import { Button, Modal, Select } from "antd";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Ban, Shield, Clock } from "lucide-react";
import { Form, FormMessage } from "@/components/ui/form";
import CustomFormField from "@/components/shared/CustomInput";
import SubmitButton from "@/components/Buttons/SubmitButton";
import { FormFieldType } from "@/enums";
import { durationOptions } from "@/constants/options";

interface BanModalProps {
  open: boolean;
  onCancel: () => void;
  user: User;
  onSuccess: (action: string) => void;
}

// Validation schema
const banUserSchema = z.object({
  reason: z
    .string()
    .min(10, "Reason must be at least 10 characters")
    .max(500, "Reason must not exceed 500 characters"),
  duration: z.enum(["1day", "7days", "30days", "permanent"]),
});

type BanFormValues = z.infer<typeof banUserSchema>;

const BanModal: React.FC<BanModalProps> = ({
  open,
  onCancel,
  user,
  onSuccess,
}) => {
  const form = useForm<BanFormValues>({
    resolver: zodResolver(banUserSchema),
    defaultValues: {
      reason: "",
      duration: "permanent",
    },
  });

  const handleSubmit = async (data: BanFormValues) => {
    try {
      console.log("Banning user:", { userId: user.name, ...data });
      onSuccess("banned");
      handleClose();
    } catch (error) {
      console.error("Failed to ban user:", error);
    }
  };

  const handleClose = () => {
    form.reset();
    onCancel();
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2.5 pb-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-sm">
            <Ban className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-semibold">Ban User Account</span>
        </div>
      }
      open={open}
      onCancel={handleClose}
      footer={null}
      width={560}
      centered
      destroyOnClose
    >
      <div className="py-2">
        <div className="space-y-5">
          {/* Centered Icon with Animation */}

          {/* Main Message */}
          <div className="text-center px-4">
            <p className=" font-semibold text-lg leading-tight">
              Restrict access for{" "}
              <span className="text-primary-color1 font-bold">{user.name}</span>
              ?
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 leading-relaxed">
              This action will temporarily or permanently restrict the user's
              access to the platform based on your selection.
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-5"
            >
              {/* Reason Field */}
              <div className="  rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-4 h-4 text-primary-color1" />
                  <label className="text-sm font-semibold ">
                    Reason for Ban
                  </label>
                </div>
                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  name="reason"
                  placeholder="Provide a detailed reason for banning this user (minimum 10 characters)..."
                />
              </div>

              {/* Duration Field */}
              <div className="   p-4 ">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-primary-color1" />
                  <label className="text-sm font-semibold">Ban Duration</label>
                </div>
                <Controller
                  name="duration"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <div>
                      <Select
                        {...field}
                        size="large"
                        className="w-full"
                        placeholder="Select how long to ban this user"
                        options={durationOptions}
                        status={fieldState.error ? "error" : ""}
                      />
                      <FormMessage />
                    </div>
                  )}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 pt-6 mt-2 ">
                <Button
                  onClick={handleClose}
                  size="large"
                  className="min-w-[110px] font-medium"
                >
                  Cancel
                </Button>
                <SubmitButton
                  icon={Ban}
                  variant="destructive"
                  iconPosition="right"
                  className="min-w-[130px] font-medium shadow-lg hover:shadow-xl transition-shadow"
                >
                  Ban User
                </SubmitButton>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};

export default BanModal;
