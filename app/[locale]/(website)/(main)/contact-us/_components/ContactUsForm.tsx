'use client';

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import SubmitButton from "@/components/Buttons/SubmitButton";
import CustomFormField, { FormFieldType } from "@/components/shared/CustomInput";
import usePostData from "@/hooks/usePostData";
import { ICONS } from "@/constants/icons";
import { useTranslations } from "next-intl";

// Contact Form Component
export function ContactForm() {
  const t = useTranslations("contact");
  const ft = useTranslations("fields");
  const vt = useTranslations("validation");

  const {
    postData,
    loading: isLoading,
    error,
    success,
  } = usePostData("/api/contact", {
    showNotifications: true,
    successMessage: t("success_msg"),
    errorMessage: t("error_msg"),
    onSuccess: () => {
      form.reset();
    },
  });

  // Validation schema for contact form
  const ContactFormValidation = z.object({
    firstName: z.string().min(1, vt("first_name_required")).max(50, vt("first_name_too_long")),
    lastName: z.string().min(1, vt("last_name_required")).max(50, vt("last_name_too_long")),
    email: z.string().email(vt("email_invalid")),
    phone: z.string()
      .min(10, vt("phone_min_10_digits"))
      .regex(/^[0-9+\-\s()]+$/, vt("phone_invalid")),
    message: z.string()
      .min(10, vt("message_min_10_chars"))
      .max(1000, vt("message_too_long")),
  });

  type ContactFormData = z.infer<typeof ContactFormValidation>;

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
    <div className="bg-gray-100 dark:bg-gray-800 rounded-3xl p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="firstName"
              label={ft("first_name")}
              placeholder={ft("first_name_placeholder")}
              iconSrc={ICONS.userInput}
            />
            
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="lastName"
              label={ft("last_name")}
              placeholder={ft("last_name_placeholder")}
              iconSrc={ICONS.userInput}
            />
          </div>

          {/* Email and Phone */}
          <div className="grid grid-cols-2 gap-4">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label={ft("email")}
              iconSrc={ICONS.email}
              placeholder="John@gmail.com"
            />
            
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="phone"
              label={ft("phone_number")}
              iconSrc={ICONS.phone}
              placeholder="09613358846"
            />
          </div>

          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="message"
            label={ft("message")}
            placeholder={ft("message_placeholder")}
          />

          {/* Submit Button */}
          <SubmitButton
            isLoading={isLoading}
            className="w-full md:w-auto px-8 py-3 bg-primary-color1 hover:bg-primary-color2 dark:hover:bg-primary-color2 text-white font-medium rounded-lg transition-colors"
            loadingText={t("sending")}
          >
            {t("send_message")}
          </SubmitButton>
        </form>
      </Form>
    </div>
  );
}