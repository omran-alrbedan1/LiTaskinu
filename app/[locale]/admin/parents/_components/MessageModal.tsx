import React from "react";
import { Modal, Button, Tag, Avatar, List } from "antd";
import { SendOutlined, UserOutlined, CloseOutlined } from "@ant-design/icons";
import { MessageSquare, Mail, Users } from "lucide-react";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import CustomFormField, {
  FormFieldType,
} from "@/components/shared/CustomInput";
import { ICONS } from "@/constants/icons";

// Validation schema for message form
const MessageFormValidation = z.object({
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

interface ParentType {
  parent: {
    avatar?: string;
    name: string;
    relationship: string;
    email?: string;
  };
  member: {
    name: string;
  };
}

interface MessageModalProps {
  open: boolean;
  onCancel: () => void;
  onSend: (values: z.infer<typeof MessageFormValidation>) => void;
  selectedParents?: ParentType[];
  isBulk?: boolean;
  title?: string;
  loading?: boolean;
}

export const MessageModal: React.FC<MessageModalProps> = ({
  open,
  onCancel,
  onSend,
  selectedParents = [],
  isBulk = false,
  title,
  loading = false,
}) => {
  const recipientsCount = isBulk ? selectedParents.length : 1;

  // Use react-hook-form with zod validation
  const form = useForm<z.infer<typeof MessageFormValidation>>({
    resolver: zodResolver(MessageFormValidation),
    defaultValues: {
      subject: "",
      message: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof MessageFormValidation>) => {
    onSend(values);
  };

  const handleCancel = () => {
    form.reset();
    onCancel();
  };

  // Fallback button component in case SubmitButton has issues
  const SendButton = ({
    isLoading,
    children,
    className = "",
    onClick,
    icon,
  }: any) => (
    <Button
      type="primary"
      size="large"
      onClick={onClick}
      loading={isLoading}
      icon={icon}
      className={`min-w-[150px] text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 border-0 shadow-lg hover:shadow-xl transition-shadow ${className}`}
    >
      {children}
    </Button>
  );

  return (
    <Modal
      title={
        <div className="flex items-center gap-2.5 pb-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm">
            <MessageSquare className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            {title || "Send Message"}
          </span>
        </div>
      }
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={600}
      centered
      closeIcon={<CloseOutlined className="text-gray-500" />}
      className="message-modal"
    >
      <div className="py-2">
        <div className="space-y-6">
          {/* Centered Icon with Animation */}
          <div className="flex flex-col items-center justify-center py-2">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-blue-500 opacity-20 animate-pulse"></div>
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg ring-4 ring-blue-100 dark:ring-blue-900/30">
                <Mail className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          {/* Main Message */}
          <div className="text-center px-4">
            <p className="font-semibold text-lg leading-tight text-gray-900 dark:text-white">
              {isBulk ? (
                <>
                  Send message to{" "}
                  <span className="text-blue-600 font-bold">
                    {recipientsCount}
                  </span>{" "}
                  parent{recipientsCount > 1 ? "s" : ""}
                </>
              ) : (
                <>
                  Send message to{" "}
                  <span className="text-blue-600 font-bold">
                    {selectedParents[0]?.parent.name}
                  </span>
                </>
              )}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-2 leading-relaxed">
              {isBulk
                ? "This message will be sent to all selected parents."
                : "This message will be sent to the selected parent."}
            </p>
          </div>

          {/* Recipients Section */}
          <div className="rounded-lg border border-blue-200 dark:border-blue-800 p-4 bg-blue-50 dark:bg-blue-900/20">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-4 h-4 text-blue-600" />
              <p className="text-blue-900 dark:text-blue-500 text-sm font-semibold">
                Recipients:
              </p>
              <Tag
                color="blue"
                className="text-sm px-3 py-1 rounded-lg ml-auto"
              >
                {recipientsCount} parent{recipientsCount > 1 ? "s" : ""}
              </Tag>
            </div>

            {isBulk && selectedParents.length > 0 ? (
              <div className="max-h-24 overflow-y-auto">
                <List
                  size="small"
                  dataSource={selectedParents.slice(0, 4)}
                  renderItem={(parent) => (
                    <List.Item className="border-0 !px-1 py-1">
                      <div className="flex items-center gap-2 w-full">
                        <Avatar
                          src={parent.parent.avatar}
                          icon={<UserOutlined />}
                          size="small"
                          className="border border-blue-200"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {parent.parent.name}
                          </div>
                          <div className="text-xs text-gray-500 truncate">
                            {parent.parent.relationship}
                          </div>
                        </div>
                      </div>
                    </List.Item>
                  )}
                />
                {selectedParents.length > 4 && (
                  <div className="text-center text-sm text-gray-500 mt-2 pt-2 border-t border-blue-200 dark:border-blue-700">
                    +{selectedParents.length - 4} more parent
                    {selectedParents.length - 4 > 1 ? "s" : ""}
                  </div>
                )}
              </div>
            ) : (
              selectedParents.length === 1 && (
                <div className="flex items-center gap-3 p-2 bg-white dark:bg-gray-800 rounded-lg">
                  <Avatar
                    src={selectedParents[0].parent.avatar}
                    icon={<UserOutlined />}
                    size="default"
                    className="border border-blue-300"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {selectedParents[0].parent.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {selectedParents[0].parent.relationship} -{" "}
                      {selectedParents[0].member.name}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>

          {/* Message Form using react-hook-form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="subject"
                label="Message Subject"
                placeholder="Enter message subject..."
                iconSrc={ICONS.email}
                iconAlt="subject"
              />

              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="message"
                label="Message Text"
                placeholder="Enter your message here..."
              />
            </form>
          </Form>
        </div>

        {/* Action Buttons - Using fallback button */}
        <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-gray-200 dark:border-gray-500">
          <Button
            onClick={handleCancel}
            size="large"
            disabled={loading}
            className="min-w-[100px]"
          >
            Cancel
          </Button>
          <SendButton
            isLoading={loading}
            onClick={form.handleSubmit(handleSubmit)}
            className="min-w-[150px]"
            icon={<SendOutlined />}
          >
            Send Message
          </SendButton>
        </div>
      </div>
    </Modal>
  );
};
