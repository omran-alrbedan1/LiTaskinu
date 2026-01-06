"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Send } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import CustomFormField, {
  FormFieldType,
} from "@/components/shared/CustomInput";
import SubmitButton from "@/components/Buttons/SubmitButton";
import { useState } from "react";

// Validation schema
const ResponseFormValidation = z.object({
  responseMessage: z
    .string()
    .min(10, "Response must be at least 10 characters")
    .max(1000, "Response must not exceed 1000 characters"),
});

type ResponseFormValues = z.infer<typeof ResponseFormValidation>;

interface ResponseSectionProps {
  reporterEmail?: string;
  onSubmit?: (data: ResponseFormValues) => void;
}

const ResponseSection = ({
  reporterEmail = "reporter@example.com",
  onSubmit,
}: ResponseSectionProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ResponseFormValues>({
    resolver: zodResolver(ResponseFormValidation),
    defaultValues: {
      responseMessage: "",
    },
  });

  const handleSubmit = async (data: ResponseFormValues) => {
    setIsLoading(true);
    try {
      if (onSubmit) {
        await onSubmit(data);
      } else {
        console.log("Sending response:", {
          to: reporterEmail,
          message: data.responseMessage,
        });

        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Response sent successfully");
      }
    } catch (error) {
      console.error("Failed to send response:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-sm border-gray-200">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Send className="w-5 h-5 text-primary-color1" />
          <CardTitle className="text-xl">Response Management</CardTitle>
        </div>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600 mb-2 block">
                Send Response to Reporter
              </label>
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="responseMessage"
                label=""
                placeholder="Write your response to the reporter here..."
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 pt-4 border-t">
            <span className="text-sm text-gray-500">
              This message will be sent to {reporterEmail} via email
            </span>
            <SubmitButton
              isLoading={isLoading}
              className="bg-primary-color1 text-white"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Response
            </SubmitButton>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default ResponseSection;
