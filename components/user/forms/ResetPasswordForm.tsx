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

const ResetPasswordValidation = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const ResetPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(ResetPasswordValidation),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: {
    password: string;
    confirmPassword: string;
  }) => {
    setIsLoading(true);
    try {
      console.log("Reset password with:", data.password);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Redirect to login or success page
      router.push("/login");
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <h2 className="text-2xl text-center font-bold text-white mb-6">
        Create New Password
      </h2>

      <p className="text-gray-400 text-center mb-6">
        Please enter your new password below.
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 text-white"
        >
          <CustomFormField
            fieldType={FormFieldType.PASSWORD}
            control={form.control}
            name="password"
            label="New Password"
            placeholder="Enter your new password"
            iconSrc={ICONS.lock}
            iconAlt="password"
          />

          <CustomFormField
            fieldType={FormFieldType.PASSWORD}
            control={form.control}
            name="confirmPassword"
            label="Confirm Password"
            placeholder="Confirm your new password"
            iconSrc={ICONS.lock}
            iconAlt="confirm password"
          />

          <SubmitButton isLoading={isLoading} className="w-full">
            Reset Password
          </SubmitButton>
        </form>
      </Form>

      <div className="mt-4 text-center">
        <Link href="./sign-in" className="text-primary hover:underline">
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
