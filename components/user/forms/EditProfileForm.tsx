// components/forms/EditProfileForm.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FormFieldType } from "@/enums";
import { ICONS } from "@/constants/icons";
import {
  countryOptions,
  genderOptions,
  religionOptions,
} from "@/constants/options";
import CustomFormField from "@/components/shared/CustomInput";
import SubmitButton from "@/components/Buttons/SubmitButton";
import useGetData from "@/hooks/useGetData";
import usePostData from "@/hooks/usePostData";

const EditProfileValidation = z.object({
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
  religion: z.string().optional(),
  jobTitle: z.string().optional(),
  occupation: z.string().optional(),
  place: z.string().optional(),
  weight: z.string().optional(),
  height: z.string().optional(),
  introduction: z.string().optional(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .optional()
    .or(z.literal("")),
});

interface EditProfileFormProps {
  initialData?: UserProfile;
}

const EditProfileForm = ({ initialData }: EditProfileFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    data: userData,
    loading: dataLoading,
    error: dataError,
    refetch,
  } = useGetData({
    url: "/api/user/profile",
    enabled: !initialData,
    initialData: initialData || null,
  });

  const {
    postData,
    loading: submitLoading,
    error: submitError,
    success: submitSuccess,
    reset: resetSubmitState,
  } = usePostData("/api/user/profile", {
    showNotifications: true,
    successMessage: "Profile updated successfully!",
    onSuccess: () => {
      router.push("/profile");
    },
    onError: (error) => {
      console.error("Update failed:", error);
    },
  });

  const form = useForm<z.infer<typeof EditProfileValidation>>({
    resolver: zodResolver(EditProfileValidation),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: "",
      dateOfBirth: "",
      country: "",
      email: "",
      phone: "",
      religion: "",
      jobTitle: "",
      occupation: "",
      place: "",
      weight: "",
      height: "",
      introduction: "",
      password: "",
    },
  });

  useEffect(() => {
    const dataToUse = userData || initialData;
    if (dataToUse) {
      form.reset({
        ...dataToUse,
        password: "",
      });
    }
  }, [userData, initialData, form]);

  async function onSubmit(values: z.infer<typeof EditProfileValidation>) {
    const updateData = { ...values };
    if (!updateData.password) {
      delete updateData.password;
    }

    await postData(updateData);
  }

  return (
    <div className="w-full pb-20 px-4 md:p-6 md:pb-20 rounded-lg shadow-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Basic Information Section */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl   font-semibold text-gray-800 mb-4">
              Basic Information
            </h3>

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

            <div className="grid my-4 grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>

          {/* Contact Information Section */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Contact Information
            </h3>

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email Address"
              placeholder="john@gmail.com"
              iconSrc={ICONS.email}
              iconAlt="email"
            />
            <div className="my-4">
              <CustomFormField
                fieldType={FormFieldType.PHONE_INPUT}
                control={form.control}
                name="phone"
                label="Phone Number"
              />
            </div>
          </div>

          {/* Professional Information Section */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Professional Information
            </h3>

            <div className="grid grid-cols-1 my-4 md:grid-cols-2 gap-4">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="jobTitle"
                label="Your Job Title"
                placeholder="Software Engineer"
                iconSrc={ICONS.userInput}
              />

              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="occupation"
                label="Your Occupation"
                placeholder="Technology"
                iconSrc={ICONS.userInput}
              />
            </div>

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="place"
              label="Your Place"
              placeholder="New York, USA"
              iconSrc={ICONS.userInput}
            />
          </div>

          {/* Personal Details Section */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Personal Details
            </h3>

            <div className="grid grid-cols-1 my-4 md:grid-cols-2 gap-4">
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="religion"
                label="Your Religion"
                placeholder="Select religion"
                options={religionOptions}
              />

              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="weight"
                label="Your Weight"
                placeholder="70 kg"
                iconSrc={ICONS.userInput}
              />
            </div>

            <div className="grid grid-cols-1 my-4 md:grid-cols-2 gap-4">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="height"
                label="Your Height"
                placeholder="175 cm"
                iconSrc={ICONS.userInput}
              />
            </div>

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="introduction"
              label="Your Introduction"
              placeholder="Tell us about yourself..."
            />
          </div>

          {/* Security Section */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Security
            </h3>

            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.PASSWORD}
              name="password"
              label="Change Password (optional)"
              placeholder="Enter new password"
              iconSrc={ICONS.lock}
            />
            <p className="text-sm text-gray-500 mt-1">
              Leave blank to keep current password
            </p>
          </div>

          <SubmitButton
            isLoading={isLoading}
            loadingText="Updating Profile..."
            className="w-full"
            type="submit"
          >
            Update Profile
          </SubmitButton>
        </form>
      </Form>

      <div className="mt-6 text-sm text-center">
        <button
          onClick={() => router.back()}
          className="text-gray-600 hover:text-gray-800 transition-colors"
        >
          ← Back to Profile
        </button>
      </div>
    </div>
  );
};

export default EditProfileForm;
