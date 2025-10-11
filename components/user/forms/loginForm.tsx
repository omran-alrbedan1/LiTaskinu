"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { useState } from "react";

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

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginFormValidation>>({
    resolver: zodResolver(LoginFormValidation),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  async function onSubmit({
    name,
    email,
  }: z.infer<typeof LoginFormValidation>) {
    setIsLoading(true);
    try {
      const userData = { name, email };
      console.log("Login data:", userData);
      //   const user = await createUser(userData);
      //   console.log(user);
      //   if (user) {
      //     router.push(`/patients/${user.$id}/register`);
      //   }
      router.push("./home");
    } catch (error) {
      console.log(error);
    }
  }

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    const credential = credentialResponse.credential;

    if (credential) {
      try {
        console.log("Google login successful:", credential);
      } catch (error) {
        console.error("Google login error:", error);
      }
    }
  };
  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-lg shadow-sm">
      <div className="text-center mb-4">
        <Image
          src={images.logo}
          width={100}
          height={100}
          alt="logo"
          className="mx-auto mb-2 md:hidden"
        />
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Welcome Back
        </h2>
        <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="name"
            label="Full name"
            placeholder="John Doe"
            iconSrc={ICONS.user}
            iconAlt="user"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email"
            placeholder="John@gmail.com"
            iconSrc={ICONS.email}
            iconAlt="email"
          />

          {/* Forgot Password Link */}
          <div className="text-right">
            <Link
              href="./forgot-password"
              className="text-sm text-primary hover:text-primary/90 transition-colors"
            >
              Forgot your password?
            </Link>
          </div>

          <SubmitButton isLoading={isLoading} className="w-full">
            Sign In
          </SubmitButton>
        </form>
      </Form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        useOneTap
        text="signup_with"
        shape="rectangular"
        size="large"
        width={"100%"}
      />
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={() => router.push("./sign-up")}
            className="font-medium text-primary hover:text-primary/90 transition-colors"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
