"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ICONS } from "@/constants/icons";
import { countryOptions, genderOptions } from "@/constants/options";
import CustomFormField, {
  FormFieldType,
} from "@/components/shared/CustomInput";
import SubmitButton from "@/components/Buttons/SubmitButton";
import useGetData from "@/hooks/useGetData";
import usePostData from "@/hooks/usePostData";
import { Calendar, Key, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChangePasswordModal from "./ChangePasswordModal";
import ImageUploader from "./ImageUploader";

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
  place: z.string().optional(),
  introduction: z.string().optional(),
  images: z
    .array(z.string())
    .max(4, "You can upload up to 4 images")
    .optional(),
});

interface EditProfileFormProps {
  initialData?: UserProfile;
}

const EditProfileForm = ({ initialData }: EditProfileFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
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
      place: "",
      introduction: "",
      images: [],
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

    await postData(updateData);
  }

  return (
    <div className="w-full pb-20 px-4 md:p-6 md:pb-20 rounded-lg shadow-sm">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Basic Information Section */}
          <div className=" p-4 rounded-lg">
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
          <div className=" p-4 rounded-lg">
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
            {/* Profile Images Section */}

            <div className="p-4 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Profile Images
              </h3>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload up to 4 images
              </label>

              <ImageUploader
                value={form.watch("images") || []}
                onChange={(newImages) => form.setValue("images", newImages)}
                maxImages={4}
              />
            </div>
          </div>

          {/* Security Section */}
          <div className="p-6 rounded-lg border border-gray-200 bg-gray-50/30">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
              <Shield className="w-5 h-5 text-primary-color1" />
              Account Security
            </h3>

            <div className="space-y-4">
              {/* Password Change Card */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Key className="w-4 h-4 text-gray-600" />
                    <h4 className="font-semibold text-gray-900">Password</h4>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-3 h-3" />
                    <span>Last changed 3 months ago</span>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsPasswordModalOpen(true)}
                  className="flex items-center gap-2 whitespace-nowrap border-primary-color1 text-primary-color1 hover:bg-primary-color1 hover:text-white transition-colors"
                >
                  Change Password
                </Button>
              </div>

              <ChangePasswordModal
                open={isPasswordModalOpen}
                onClose={() => setIsPasswordModalOpen(false)}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end items-center gap-3 pt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-5 py-1.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition-all duration-200 flex items-center gap-2"
            >
              Cancel
            </button>

            <SubmitButton
              isLoading={isLoading}
              loadingText="Updating Profile..."
              type="submit"
              className="px-6 py-2.5 bg-primary-color1 text-white rounded-lg shadow-md hover:bg-primary-color2 transition-all duration-200"
            >
              Save Changes
            </SubmitButton>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EditProfileForm;
