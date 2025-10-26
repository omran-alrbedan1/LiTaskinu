"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import SubmitButton from "../../Buttons/SubmitButton";
import CustomFormField, { FormFieldType } from "../../shared/CustomInput";
import { ICONS } from "@/constants/icons";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { countryOptions, genderOptions } from "@/constants/options";
import Image from "next/image";
import { images } from "@/constants/images";
import usePostData from "@/hooks/usePostData";
import { RegisterFormValidation } from "@/validation";

const RegisterForm = () => {
  const router = useRouter();

  const {
    postData,
    loading: isLoading,
    error,
    success,
  } = usePostData("/api/website/signup", {
    showNotifications: true,
    successMessage: "Registration successful! Please verify your email.",
    errorMessage: "Registration failed. Please try again.",
    onSuccess: (data) => {
      router.push(
        `./otp-verification?email=${encodeURIComponent(
          form.getValues("email")
        )}`
      );
    },
  });

  const form = useForm<z.infer<typeof RegisterFormValidation>>({
    resolver: zodResolver(RegisterFormValidation),
    defaultValues: {
      first_name: "",
      last_name: "",
      gender: "",
      birath_day: "",
      country: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
      role: "guardian",
    },
  });

  // Handle form submission
  async function onSubmit(values: z.infer<typeof RegisterFormValidation>) {
    // Format date if it's a string
    const formattedValues = {
      ...values,
      birath_day:
        values.birath_day instanceof Date
          ? values.birath_day.toISOString().split("T")[0]
          : values.birath_day,
    };

    await postData(formattedValues);
  }

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    const credential = credentialResponse.credential;

    if (credential) {
      try {
        // Use the same hook for Google registration
        await postData({
          googleCredential: credential,
          loginType: "google",
        });
      } catch (error) {
        console.error("Google registration error:", error);
      }
    }
  };

  return (
    <div className="w-full py-20 mt-56 px-4 md:p-6 md:pb-20 rounded-lg shadow-sm bg-transparent">
      <div className="text-center mb-4">
        <Image
          src={images.logo}
          width={100}
          height={100}
          alt="logo"
          className="mx-auto mb-2 md:hidden"
        />
        <h2 className="text:2xl md:text-3xl font-bold text-white">
          Create Account
        </h2>
        <p className="mt-2 text-sm text-gray-400">Sign up for a new account</p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 text-white"
        >
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="first_name"
              label="First Name"
              placeholder="John"
              iconSrc={ICONS.userInput}
              iconAlt="first name"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="last_name"
              label="Last Name"
              placeholder="Doe"
              iconSrc={ICONS.userInput}
              iconAlt="last name"
            />
          </div>

          {/* Gender and Country Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="gender"
              label="Gender"
              placeholder="Select gender"
              options={genderOptions}
            />

            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="country"
              label="Country"
              placeholder="Select your country"
              options={countryOptions}
            />
          </div>

          {/* Date of Birth Field */}
          <CustomFormField
            fieldType={FormFieldType.DATE_PICKER}
            control={form.control}
            name="birath_day"
            label="Date of Birth"
            placeholder="Select your birth date"
          />

          {/* Email Field */}
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label="Email Address"
            placeholder="john@gmail.com"
            iconSrc={ICONS.email}
            iconAlt="email"
          />

          {/* Phone Field */}
          <div className="tex">
            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="phone"
              label="Phone Number"
              placeholder="Enter your phone number"
              inputClassName="!bg-blue-50 !border-blue-300 text-white dark:!bg-blue-900/20" // Only affects the phone input
            />
          </div>

          {/* Password Field */}
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.PASSWORD}
            name="password"
            label="Password"
            placeholder="Enter your password"
            iconSrc={ICONS.lock}
            iconAlt="password"
          />

          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.PASSWORD}
            name="password_confirmation"
            label="Password confirmation"
            placeholder="Enter your password again"
            iconSrc={ICONS.lock}
            iconAlt="password"
          />

          <SubmitButton isLoading={isLoading} className="w-full">
            {isLoading ? "Creating Account..." : "Create Account"}
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

      {/* Google Registration */}
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

      {/* Sign In Link */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-300">
          Already have an account?{" "}
          <button
            onClick={() => router.push("./sign-in")}
            className="font-medium text-white hover:text-gray-300 transition-colors"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
