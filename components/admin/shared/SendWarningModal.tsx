"use client";
import React from "react";
import { Modal, Button } from "antd";
import { AlertTriangle, Mail, User, FileText, Send } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import SubmitButton from "@/components/Buttons/SubmitButton";
import CustomFormField, {
  FormFieldType,
} from "@/components/shared/CustomInput";

interface SendWarningModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: (data: any) => void;
  user: any; // Changed from Complaint to any to avoid type issues
}

// Validation schema
const WarningFormValidation = z.object({
  warningType: z.string(),
  subject: z
    .string()
    .min(1, "Subject is required")
    .max(200, "Subject must not exceed 200 characters"),
  message: z
    .string()
    .min(50, "Message must be at least 50 characters")
    .max(2000, "Message must not exceed 2000 characters"),
});

type WarningFormValues = z.infer<typeof WarningFormValidation>;

const SendWarningModal: React.FC<SendWarningModalProps> = ({
  visible,
  onCancel,
  onConfirm,
  user,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<WarningFormValues>({
    resolver: zodResolver(WarningFormValidation),
    defaultValues: {
      warningType: "first_warning",
      subject: "Warning Notice - Platform Guidelines Violation",
      message: "",
    },
  });

  const warningTypeOptions = [
    {
      value: "first_warning",
      label: "First Warning",
      description: "Initial notice for minor violations",
    },
    {
      value: "behavior_warning",
      label: "Behavior Warning",
      description: "Inappropriate behavior or communication",
    },
    {
      value: "content_warning",
      label: "Content Warning",
      description: "Inappropriate content sharing",
    },
    {
      value: "harassment_warning",
      label: "Harassment Warning",
      description: "Harassment or unwanted contact",
    },
    {
      value: "final_warning",
      label: "Final Warning",
      description: "Last warning before account suspension",
    },
  ];

  const getDefaultMessage = (warningType: string) => {
    const userName = user?.reportedUser?.name || user?.reporter?.name || "User";

    const messages = {
      first_warning: `Dear ${userName},\n\nWe've noticed behavior on your account that violates our community guidelines. Please review our terms of service and ensure your future interactions align with our platform standards.\n\nContinued violations may result in account restrictions.\n\nBest regards,\nPlatform Safety Team`,
      behavior_warning: `Dear ${userName},\n\nYour recent behavior on our platform has been reported as inappropriate. We expect all users to maintain respectful and professional communication.\n\nPlease adjust your behavior to comply with our community standards.\n\nBest regards,\nPlatform Safety Team`,
      content_warning: `Dear ${userName},\n\nThe content you've shared has been flagged as inappropriate. Our platform maintains strict content guidelines to ensure a safe environment for all users.\n\nPlease remove any violating content and refrain from sharing similar material in the future.\n\nBest regards,\nPlatform Safety Team`,
      harassment_warning: `Dear ${userName},\n\nWe've received reports of harassment from your account. Harassment of any kind is strictly prohibited and violates our terms of service.\n\nImmediately cease any harassing behavior. Further reports will result in immediate account suspension.\n\nBest regards,\nPlatform Safety Team`,
      final_warning: `Dear ${userName},\n\nThis is your final warning regarding repeated violations of our platform guidelines. Your account is at risk of permanent suspension.\n\nAny further violations will result in immediate and permanent account termination.\n\nBest regards,\nPlatform Safety Team`,
    };
    return (
      messages[warningType as keyof typeof messages] || messages.first_warning
    );
  };

  const handleSubmit = async (data: WarningFormValues) => {
    setIsLoading(true);
    try {
      console.log("Sending warning:", data);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Call the onConfirm prop with the form data
      onConfirm(data);

      // Reset form and close modal
      form.reset();
      onCancel();
    } catch (error) {
      console.error("Failed to send warning:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    form.reset();
    onCancel();
  };

  // Update message when warning type changes
  const handleWarningTypeChange = (value: string) => {
    const defaultMessage = getDefaultMessage(value);
    form.setValue("message", defaultMessage);
  };

  // Set initial message when modal opens or user changes
  React.useEffect(() => {
    if (visible && user) {
      const currentWarningType = form.getValues("warningType");
      const defaultMessage = getDefaultMessage(currentWarningType);
      form.setValue("message", defaultMessage);

      // Also set the default subject based on warning type
      const defaultSubjects = {
        first_warning: "Warning Notice - Platform Guidelines Violation",
        behavior_warning: "Behavior Warning - Inappropriate Conduct",
        content_warning: "Content Warning - Policy Violation",
        harassment_warning: "Harassment Warning - Serious Violation",
        final_warning: "Final Warning - Account Suspension Risk",
      };
      form.setValue(
        "subject",
        defaultSubjects[currentWarningType as keyof typeof defaultSubjects] ||
          "Warning Notice"
      );
    }
  }, [visible, user, form]);

  return (
    <Modal
      title={
        <div className="flex items-center gap-2.5 pb-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-sm">
            <AlertTriangle className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            Send Warning
          </span>
        </div>
      }
      open={visible}
      onCancel={handleClose}
      footer={null}
      width={650}
      centered
      className="send-warning-modal"
    >
      <div className="py-2">
        {/* Recipient Information Card */}
        <div className="mb-4 p-3.5 rounded-lg bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border border-orange-200 dark:border-orange-800 shadow-sm">
          <div className="flex items-center gap-2 mb-2.5">
            <Mail className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <p className="text-orange-900 dark:text-orange-200 text-sm font-semibold">
              Recipient Information
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center flex-shrink-0">
                <User className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">User</p>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {user?.reportedUser?.name || user?.reporter?.name || "N/A"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-orange-100 dark:bg-orange-900/40 flex items-center justify-center flex-shrink-0">
                <FileText className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Complaint
                </p>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  #{user?.id}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2.5 pt-2.5 border-t border-orange-200 dark:border-orange-700">
            <Mail className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400 flex-shrink-0" />
            <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
              {user?.reportedUser?.email || user?.reporter?.email || "N/A"}
            </p>
          </div>
        </div>

        {/* React Hook Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 gap-4">
              {/* Warning Type Select */}
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="warningType"
                label="Warning Type"
                placeholder="Select warning type"
                required={true}
                options={warningTypeOptions}
                onValueChange={handleWarningTypeChange}
              />
            </div>

            {/* Subject Input */}
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="subject"
              label="Email Subject"
              placeholder="Enter email subject..."
              required={true}
            />

            {/* Message Textarea */}
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="message"
              label="Warning Message"
              placeholder="Write the warning message that will be sent to the user..."
              required={true}
            />

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
              <Button
                onClick={handleClose}
                size="large"
                className="min-w-[110px] font-medium border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <SubmitButton
                isLoading={isLoading}
                icon={Send}
                variant="default"
                iconPosition="right"
                className="min-w-[150px] font-medium shadow-lg hover:shadow-xl transition-shadow bg-orange-500 hover:bg-orange-600 border-orange-500 hover:border-orange-600 text-white dark:bg-orange-600 dark:hover:bg-orange-700 dark:border-orange-600 dark:hover:border-orange-700"
              >
                Send Warning
              </SubmitButton>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};

export default SendWarningModal;
