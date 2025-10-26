"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import SubmitButton from "../../Buttons/SubmitButton";
import { LoginFormValidation } from "@/validation";
import { ICONS } from "@/constants/icons";
import Image from "next/image";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { images } from "@/constants/images";
import Link from "next/link";
import CustomFormField, {
  FormFieldType,
} from "@/components/shared/CustomInput";
import usePostData from "@/hooks/usePostData";
import { useLocale } from "next-intl";

const LoginForm = () => {
  const router = useRouter();
  const locale = useLocale();
  const {
    postData,
    loading: isLoading,
    error,
    success,
  } = usePostData("/api/website/signin", {
    showNotifications: true,
    successMessage: "Login successfully",
    errorMessage: "Login failed. Please try again.",
    onSuccess: (data) => {
      router.push(`./home`);
    },
  });

  const form = useForm<z.infer<typeof LoginFormValidation>>({
    resolver: zodResolver(LoginFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle form submission
  async function onSubmit({
    email,
    password,
  }: z.infer<typeof LoginFormValidation>) {
    await postData({ email, password });
  }

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    const credential = credentialResponse.credential;

    if (credential) {
      try {
        // You can also use the hook for Google login
        await postData({
          googleCredential: credential,
          loginType: "google",
        });
      } catch (error) {
        console.error("Google login error:", error);
      }
    }
  };

  return (
    <div className="w-full p-6 rounded-lg shadow-sm bg-transparent">
      <div className="text-center mb-4">
        <Image
          src={images.logo}
          width={100}
          height={100}
          alt="logo"
          className="mx-auto mb-2 md:hidden"
        />
        <h2 className="text:2xl md:text-3xl font-bold text-white">
          Sign In to Your Account
        </h2>
        <p className="mt-2 text-sm text-gray-400">Sign in to your Account</p>
      </div>

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
            label="Email"
            placeholder="john@gmail.com"
            iconSrc={ICONS.email}
            iconAlt="email"
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

          {/* Forgot Password Link */}
          <div className="text-right">
            <Link
              href="./forgot-password"
              className="text-sm text-white hover:text-gray-300 transition-colors"
            >
              Forgot your password?
            </Link>
          </div>

          <SubmitButton isLoading={isLoading} className="w-full">
            {isLoading ? "Signing In..." : "Sign In"}
          </SubmitButton>
        </form>
      </Form>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-400" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-black text-gray-300">Or continue with</span>
        </div>
      </div>

      {/* Google Login */}
      <div className="bg-white rounded-lg overflow-hidden">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          useOneTap
          text="signup_with"
          shape="rectangular"
          size="large"
          width={"100%"}
        />
      </div>

      {/* Sign Up Link */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-300">
          Don't have an account?{" "}
          <button
            onClick={() => router.push("./sign-up")}
            className="font-medium text-white hover:text-gray-300 transition-colors"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
