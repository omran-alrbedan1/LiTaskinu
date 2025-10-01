"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { useState } from "react";

import { useRouter } from "next/navigation";
import SubmitButton from "../../Buttons/SubmitButton";
import CustomFormField from "../../shared/CustomInput";
import { FormFieldType } from "@/enums";
import { ICONS } from "@/constants/icons";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { countryOptions, genderOptions } from "@/constants";
import Image from "next/image";
import { images } from "@/constants/images";

const RegisterFormValidation = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  gender: z.string().min(1, "Gender is required"),
  dateOfBirth: z.union([z.string(), z.date()]).refine(
    (val) => {
      if (val instanceof Date) return !isNaN(val.getTime());
      return val.length > 0;
    },
    { message: "Date of birth is required" }
  ),
  country: z.string().min(1, "Country is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterFormValidation>>({
    resolver: zodResolver(RegisterFormValidation),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "",
      dateOfBirth: "",
      country: "",
      email: "",
      phone: "",
      password: "",
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
    <div className="w-full pb-20 px-4 md:p-6 md:pb-20 rounded-lg shadow-sm">
      <div className="text-center mb-4">
        <Image
          src={images.logo}
          width={100}
          height={100}
          alt="logo"
          className="mx-auto mb-2 md:hidden"
        />
        <h2 className="text:2xl md:text-3xl font-bold text-gray-900">
          Create Account
        </h2>
        <p className="mt-2 text-sm text-gray-600">Sign up for a new account</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
          <>
            <div className="grid grid-cols-1  md:grid-cols-2 gap-4">
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
            <CustomFormField
              fieldType={FormFieldType.DATE_PICKER}
              control={form.control}
              name="dateOfBirth"
              label="Date of Birth"
              placeholder="Select your birth date"
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email Address"
              placeholder="john@gmail.com"
              iconSrc={ICONS.email}
              iconAlt="email"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="phone"
              label="Phone Number"
            />

            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.PASSWORD}
              name="password"
              label="Password"
              placeholder="Enter your password"
              iconSrc={ICONS.lock}
            />

            <SubmitButton
              isLoading={isLoading}
              loadingText="Submitting..."
              className="w-full"
              type="submit"
              onClick={() => console.log("Submit button clicked")}
            >
              Submit
            </SubmitButton>
          </>
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

      <div className="mt-6 text-sm text-center">
        <p className="text-gray-600">
          Already have an account?{" "}
          <button
            onClick={() => router.push("./sign-in")}
            className="text-primary hover:text-primary/90 transition-colors"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
