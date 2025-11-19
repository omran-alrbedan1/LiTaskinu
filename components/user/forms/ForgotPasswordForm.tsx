"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SubmitButton from "@/components/Buttons/SubmitButton";
import CustomFormField, {
  FormFieldType,
} from "@/components/shared/CustomInput";
import { ICONS } from "@/constants/icons";
import usePostData from "@/hooks/usePostData";
import { ForgotPasswordValidation } from "@/validation";

const ForgotPasswordForm = () => {
  const router = useRouter();

  const {
    postData,
    loading: isLoading,
    error,
    success,
  } = usePostData("/api/website/forgot-password", {
    showNotifications: true,
    successMessage: "Reset code sent to your email!",
    errorMessage: "Failed to send reset code. Please try again.",
    onSuccess: (data) => {
      router.push(
        `./verify-reset-code?email=${encodeURIComponent(
          form.getValues("email")
        )}`
      );
    },
  });

  const form = useForm<z.infer<typeof ForgotPasswordValidation>>({
    resolver: zodResolver(ForgotPasswordValidation),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: z.infer<typeof ForgotPasswordValidation>) => {
    await postData(values);
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
            {isLoading ? "Sending Code..." : "Send Reset Code"}
          </SubmitButton>
        </form>
      </Form>

      <div className="mt-6 text-center">
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

export default ForgotPasswordForm;
