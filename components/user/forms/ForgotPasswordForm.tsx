"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SubmitButton from "@/components/Buttons/SubmitButton";
import CustomFormField, {
  FormFieldType,
} from "@/components/shared/CustomInput";
import { ICONS } from "@/constants/icons";

const ForgotPasswordValidation = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(ForgotPasswordValidation),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: { email: string }) => {
    setIsLoading(true);
    try {
      console.log("Reset password for:", data.email);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      router.push("./verify-reset-code");
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 text-white">
      <h2 className="text-2xl text-center font-bold mb-6">
        Reset Your Password
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="your@email.com"
            iconSrc={ICONS.email}
            iconAlt="email"
          />

          <SubmitButton isLoading={isLoading} className="w-full">
            Send Reset Link
          </SubmitButton>
        </form>
      </Form>

      <div className="mt-4 text-center">
        <Link href="/login" className="text-primary hover:underline">
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
