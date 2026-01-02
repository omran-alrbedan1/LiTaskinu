"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { useState } from "react";

import { useRouter } from "next/navigation";
import SubmitButton from "../../Buttons/SubmitButton";
import CustomFormField, { FormFieldType } from "../../shared/CustomInput";
import { ICONS } from "@/constants/icons";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { countryOptions, kinshipOptions } from "@/constants/options";
import Image from "next/image";
import { images } from "@/constants/images";

const RegisterFormValidation = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  kinship: z.string().min(1, "Type of kinship is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
});

const ParentRegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterFormValidation>>({
    resolver: zodResolver(RegisterFormValidation),
    defaultValues: {
      firstName: "",
      lastName: "",
      kinship: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof RegisterFormValidation>) {
    setIsLoading(true);
    try {
      console.log("Registration data:", values);
      router.push("./otp-verification");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    const credential = credentialResponse.credential;

    if (credential) {
      try {
        console.log("Google registration successful:", credential);
      } catch (error) {
        console.error("Google registration error:", error);
      }
    }
  };

  return (
    <div className="w-full overflow-y-scroll max-h-svh hide-scrollbar pb-20 md:p-6 md:pb-20 rounded-lg shadow-sm ">
      <div className="text-center mb-4 hidden md:block">
        <h2 className="text:2xl md:text-3xl font-bold text-white">
          Parent Information
        </h2>
        <p className="mt-2 text-sm text-gray-300">
          Please provide parent details
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 text-white"
        >
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="firstName"
                label="First Name"
                placeholder="John"
                iconSrc={ICONS.userInput}
              />

              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="lastName"
                label="Last Name"
                placeholder="Doe"
                iconSrc={ICONS.userInput}
              />
            </div>

            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="kinship"
              label="Type of kinship"
              placeholder="Select kinship type"
              options={kinshipOptions}
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email Address"
              placeholder="loisbecket@gmail.com"
              iconSrc={ICONS.email}
              iconAlt="email"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="phone"
              label="Phone Number"
            />

            <SubmitButton
              isLoading={isLoading}
              loadingText="Submitting..."
              className="w-full"
              type="submit"
              onClick={() => console.log("Submit button clicked")}
            >
              Continue
            </SubmitButton>
          </>
        </form>
      </Form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gray-900 text-gray-500 dark:text-gray-400">
            Or continue with
          </span>
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
    </div>
  );
};

export default ParentRegisterForm;
