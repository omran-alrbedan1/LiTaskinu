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
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

// Simple validation schema for user login
const UserLoginValidation = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export const LoginForm = () => {
  const router = useRouter();

  const {
    postData,
    loading: isLoading,
    error,
    success,
  } = usePostData("/api/website/signin", {
    showNotifications: true,
    successMessage: "Login successful",
    errorMessage: "Login failed. Please try again.",
    onSuccess: (data) => {
      router.push("./home");
      router.refresh();
    },
  });

  const form = useForm<z.infer<typeof UserLoginValidation>>({
    resolver: zodResolver(UserLoginValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle form submission
  async function onSubmit({
    email,
    password,
  }: z.infer<typeof UserLoginValidation>) {
    await postData({ email, password });
  }

  // Handle Google login
  const handleGoogleLogin = () => {
    // You can implement Google OAuth here
    // For example:
    // window.location.href = '/api/auth/google';
    // or use a package like next-auth
    console.log("Google login clicked");

    // If using NextAuth.js
    // signIn('google', { callbackUrl: '/dashboard' });
  };

  return (
    <div className="w-full dark p-8 bg-transparent rounded-lg  ">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
        <p className="text-gray-300 mt-2">Sign in to your account</p>
      </div>

      {/* Login Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 text-white"
        >
          {/* Email Field */}
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email Address"
            placeholder="user@example.com"
            iconSrc={ICONS.email}
            iconAlt="email"
            inputClassName="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
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
            inputClassName="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-blue-500"
          />

          {/* Forgot Password Link */}
          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-sm text-primary-color1 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>

          {/* Submit Button */}
          <SubmitButton
            isLoading={isLoading}
            className="w-full !p-3"
            loadingText="Signing In..."
          >
            Sign In
          </SubmitButton>
        </form>
      </Form>
      {/* Divider */}
      <div className="relative mb-6 mt-8">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full bg-gray-700" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-gray-900 px-2 text-gray-400">
            Or continue with email
          </span>
        </div>
      </div>

      {/* Google Login Button */}
      <Button
        type="button"
        variant="outline"
        className="w-full mb-6 flex items-center justify-center gap-3 py-6 bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-gray-600 text-white"
        onClick={handleGoogleLogin}
      >
        <img
          src={ICONS.google || "/icons/google.svg"}
          alt="Google"
          className="w-5 h-5"
        />
        <span>Continue with Google</span>
      </Button>

      {/* Sign Up Link */}
      <div className="text-center mt-6 pt-6 border-t border-gray-800">
        <p className="text-gray-400">
          Don't have an account?{" "}
          <Link
            href="./sign-up"
            className="text-primary-color1 font-medium hover:underline"
          >
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
