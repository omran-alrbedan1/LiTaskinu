"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import SubmitButton from "@/components/Buttons/SubmitButton";
import { ICONS } from "@/constants/icons";
import CustomFormField, {
  FormFieldType,
} from "@/components/shared/CustomInput";
import usePostData from "@/hooks/usePostData";

// Simple validation schema for admin login
const AdminLoginValidation = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export function LoginForm() {
  const router = useRouter();

  const {
    postData,
    loading: isLoading,
    error,
    success,
  } = usePostData("/api/admin/login", {
    showNotifications: true,
    successMessage: "Login successfully",
    errorMessage: "Login failed. Please try again.",
    onSuccess: (data) => {
      router.push("/admin/en/dashboard");
      router.refresh();
    },
  });

  const form = useForm<z.infer<typeof AdminLoginValidation>>({
    resolver: zodResolver(AdminLoginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle form submission
  async function onSubmit({
    email,
    password,
  }: z.infer<typeof AdminLoginValidation>) {
    await postData({ email, password });
  }

  return (
    <div className="w-full p-8 rounded-lg ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email Address"
            placeholder="admin@example.com"
            iconSrc={ICONS.email}
            iconAlt="email"
            className="text-white"
          />

          {/* Password Field */}
          <CustomFormField
            fieldType={FormFieldType.PASSWORD}
            control={form.control}
            name="password"
            label="Password"
            placeholder="Enter your password"
            iconSrc={ICONS.lock}
            iconAlt="password"
          />

          {/* Submit Button */}
          <SubmitButton
            isLoading={isLoading}
            className="w-full"
            loadingText="Signing In ..."
          >
            Sign In
          </SubmitButton>
        </form>
      </Form>
    </div>
  );
}
