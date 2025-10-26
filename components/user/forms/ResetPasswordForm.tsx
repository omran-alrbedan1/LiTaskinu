"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import SubmitButton from "@/components/Buttons/SubmitButton";
import CustomFormField, {
  FormFieldType,
} from "@/components/shared/CustomInput";
import { ICONS } from "@/constants/icons";
import usePostData from "@/hooks/usePostData";
import { ResetPasswordValidation } from "@/validation";

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reset_token = searchParams.get("token");

  const {
    postData,
    loading: isLoading,
    error,
    success,
  } = usePostData("/api/website/reset-password", {
    showNotifications: true,
    successMessage: "Password reset successfully!",
    errorMessage: "Failed to reset password.",
    onSuccess: (data) => {
      router.push("./sign-in");
    },
  });

  const form = useForm<z.infer<typeof ResetPasswordValidation>>({
    resolver: zodResolver(ResetPasswordValidation),
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ResetPasswordValidation>) => {
    if (!reset_token) {
      form.setError("root", {
        message: "Reset token is missing. Please request a new reset link.",
      });
      return;
    }

    const requestData = {
      reset_token,
      password: values.password,
      password_confirmation: values.password_confirmation,
    };

    await postData(requestData);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <h2 className="text-2xl text-center font-bold text-white mb-6">
        Create New Password
      </h2>

      <p className="text-gray-400 text-center mb-6">
        Please enter your new password below.
      </p>

      {!reset_token && (
        <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-4">
          <p className="text-red-400 text-sm">
            Invalid or missing reset token. Please request a new password reset
            link.
          </p>
        </div>
      )}

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
            name="password_confirmation"
            label="Confirm Password"
            placeholder="Confirm your new password"
            iconSrc={ICONS.lock}
            iconAlt="confirm password"
          />

          <SubmitButton isLoading={isLoading} className="w-full">
            {isLoading ? "Resetting Password..." : "Reset Password"}
          </SubmitButton>
        </form>
      </Form>

      <div className="mt-4 text-center">
        <Link
          href="./sign-in"
          className="text-primary-color2 hover:text-primary-color1 transition-colors"
        >
          Back to Sign In
        </Link>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
