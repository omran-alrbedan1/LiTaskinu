'use client';

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { Mail, Phone, MessageCircle } from "lucide-react";
import SubmitButton from "@/components/Buttons/SubmitButton";
import CustomFormField, { FormFieldType } from "@/components/shared/CustomInput";
import usePostData from "@/hooks/usePostData";
import { ICONS } from "@/constants/icons";

// Validation schema for contact form
const ContactFormValidation = z.object({
  firstName: z.string().min(1, "First name is required").max(50, "First name is too long"),
  lastName: z.string().min(1, "Last name is required").max(50, "Last name is too long"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(/^[0-9+\-\s()]+$/, "Please enter a valid phone number"),
  message: z.string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message is too long"),
});

type ContactFormData = z.infer<typeof ContactFormValidation>;

// Contact Form Component
export function ContactForm() {
  const {
    postData,
    loading: isLoading,
    error,
    success,
  } = usePostData("/api/contact", {
    showNotifications: true,
    successMessage: "Message sent successfully!",
    errorMessage: "Failed to send message. Please try again.",
    onSuccess: () => {
      form.reset();
    },
  });

  const form = useForm<ContactFormData>({
    resolver: zodResolver(ContactFormValidation),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  // Handle form submission
  async function onSubmit(data: ContactFormData) {
    await postData(data);
  }

  return (
    <div className="bg-gray-100 rounded-3xl p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="firstName"
              label="First Name"
              placeholder="John"
              iconSrc={ICONS.userInput}
              className=" rounded-lg"
            />
            
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="lastName"
              label="Last Name"
              placeholder="Carter"
              iconSrc={ICONS.userInput}
              className=" rounded-lg"
            />
          </div>

          {/* Email and Phone */}
          <div className="grid grid-cols-2 gap-4">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email"
                iconSrc={ICONS.email}
              placeholder="John@gmail.com"
              className=" rounded-lg"
            />
            
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="phone"
              label="Phone Number"
              iconSrc={ICONS.phone}
              placeholder="09613358846"
              className=" rounded-lg"
            />
          </div>

          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="message"
            label="Message"
            placeholder="Type here your message"
            className=" rounded-lg resize-none"
          />

          {/* Submit Button */}
          <SubmitButton
            isLoading={isLoading}
            className="w-full md:w-auto px-8 py-3 text-white font-medium rounded-lg transition-colors"
            loadingText="Sending..."
          >
            Send Message
          </SubmitButton>
        </form>
      </Form>
    </div>
  );
}