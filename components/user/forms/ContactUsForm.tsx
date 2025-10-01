"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { useState } from "react";

import { useRouter } from "next/navigation";
import SubmitButton from "../../Buttons/SubmitButton";
import CustomFormField from "../../shared/CustomInput";
import { FormFieldType } from "@/enums";
import { ICONS } from "@/constants/icons";

const RegisterFormValidation = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  message: z.string().optional(),
});

const ContactUsForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterFormValidation>>({
    resolver: zodResolver(RegisterFormValidation),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof RegisterFormValidation>) {
    setIsLoading(true);
    try {
      console.log("contact us data:", values);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full overflow-y-scroll max-h-svh hide-scrollbar pb-20 md:p-6 md:pb-20 rounded-lg ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <>
            <div className="grid grid-cols-1 mb-8 md:grid-cols-2 gap-4">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="username"
                label="Username"
                placeholder="Full Name"
                iconSrc={ICONS.userInput}
              />
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="email"
                label="Email Address"
                placeholder="user@gmail.com"
                iconSrc={ICONS.email}
                iconAlt="email"
              />
            </div>

            <div className="grid grid-cols-1  md:grid-cols-2 gap-4">
              <CustomFormField
                fieldType={FormFieldType.PHONE_INPUT}
                control={form.control}
                name="phone"
                label="Phone Number"
              />
              <CustomFormField
                fieldType={FormFieldType.TEXTAREA}
                control={form.control}
                name="message"
                label="Your Message"
              />
            </div>

            <SubmitButton
              isLoading={isLoading}
              loadingText="Submitting..."
              className="w-full"
              type="submit"
              onClick={() => console.log("Submit button clicked")}
            >
              Submit
            </SubmitButton>
          </>
        </form>
      </Form>
    </div>
  );
};

export default ContactUsForm;
