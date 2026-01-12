"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMemo, useRef } from "react";



import { Form } from "@/components/ui/form";
import { useState, useEffect } from "react";
import { ICONS } from "@/constants/icons";
import { useGenderOptions } from "@/constants/options";
import CustomFormField, {
  FormFieldType,
} from "@/components/shared/CustomInput";
import SubmitButton from "@/components/Buttons/SubmitButton";
import useGetData from "@/hooks/useGetData";
import usePostData from "@/hooks/usePostData";
import { Key, Loader, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";
import { Camera, MapPin, User } from "lucide-react";

import ChangePasswordModal from "./ChangePasswordModal";
import ProfileImageUploader from "./ProfileImageUploader";
import SingleImageUploader from "./SingleImageUploader";

import { profileBasicInfo } from "@/validation/profile-schema";

interface EditProfileFormProps {
  initialData?: BasicProfileInfo;
}

interface ImageSlot {
  file: File | null;
  deleted: boolean;
  existingUrl: string | null;
}

const EditProfileForm = ({ initialData }: EditProfileFormProps) => {

  const genderOptions = useGenderOptions();

  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const router = useRouter();

  const { data: userData, loading: dataLoading, refetch } =
    useGetData<BasicProfileInfo>({
      url: "/api/website/profile/basic",
    });

  const userInfo = userData?.data || initialData || {};
  const documents = userInfo?.documents || {};
  const imagesObj = documents?.images || {};

  // Get default values from userInfo if available
  const getDefaultValues = () => ({
    first_name: userInfo?.first_name || "",
    last_name: userInfo?.last_name || "",
    gender: userInfo?.gender || "",
    birth_day: userInfo?.birth_day ? new Date(userInfo.birth_day) : "",
    Country_id: userInfo?.Country_id ? userInfo.Country_id.toString() : "",
    city_id: userInfo?.city_id ? userInfo.city_id.toString() : "",
    email: userInfo?.email || "",
    phone: userInfo?.phone ? userInfo.phone.toString() : "",
  });

  const form = useForm<z.infer<typeof profileBasicInfo>>({
    resolver: zodResolver(profileBasicInfo),
    defaultValues: getDefaultValues(),
  });

  const { data: countries, loading: countriesLoading } = useGetData<Country[]>({
    url: "/api/public/countries",
    enabled: true,
  });

  const { data: allCities, loading: citiesLoading } = useGetData<City[]>({
    url: "/api/public/cities",
    enabled: true,
  });

  const countryOptions = useMemo(
    () =>
      (countries || []).map((country: Country) => ({
        value: country.id.toString(),
        label: country.name,
      })),
    [countries]
  );

  const cityOptions = useMemo(
    () =>
      (allCities || []).map((city: City) => ({
        value: city.id.toString(),
        label: city.name,
      })),
    [allCities]
  );

  const [personalPhotoFile, setPersonalPhotoFile] = useState<File | null>(null);
  const [personalPhotoDeleted, setPersonalPhotoDeleted] = useState(false);

  const [imageSlots, setImageSlots] = useState<ImageSlot[]>([
    { file: null, deleted: false, existingUrl: null },
    { file: null, deleted: false, existingUrl: null },
    { file: null, deleted: false, existingUrl: null },
    { file: null, deleted: false, existingUrl: null },
  ]);

  const didInitSlots = useRef(false);

  // Initialize form with user data as soon as it's available
  useEffect(() => {
    if (!userInfo?.id) return;

    // Reset form with new data
    form.reset(getDefaultValues());

    // Initialize image slots if not already done
    if (!didInitSlots.current) {
      didInitSlots.current = true;
      setImageSlots([
        { file: null, deleted: false, existingUrl: imagesObj?.image_1 || null },
        { file: null, deleted: false, existingUrl: imagesObj?.image_2 || null },
        { file: null, deleted: false, existingUrl: imagesObj?.image_3 || null },
        { file: null, deleted: false, existingUrl: imagesObj?.image_4 || null },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo?.id, form]);

  const { postData, loading: submitLoading } = usePostData(
    "/api/website/profile/basic",
    {
      showNotifications: true,
      successMessage: "Profile updated successfully!",
      onSuccess: () => {
        refetch?.();
      },
    }
  );

  const handleSlotChange = (index: number, file: File | null, deleted: boolean) => {
    setImageSlots((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], file: deleted ? null : file, deleted: !!deleted };
      return next;
    });
  };

  const onSubmit = async (values: z.infer<typeof profileBasicInfo>) => {
    const formData = new FormData();

    // Basic fields
    (Object.keys(values) as Array<keyof typeof values>).forEach((key) => {
      const value = values[key];

      if (key === "birth_day") return;

      if (value !== undefined && value !== null && value !== "") {
        formData.append(key, value.toString());
      }
    });

    // birth_day: yyyy-mm-dd
    if (values.birth_day) {
      const date = new Date(values.birth_day);
      formData.append("birth_day", date.toISOString().split("T")[0]);
    }

    // personal_photo
    if (personalPhotoDeleted) {
      formData.append("personal_photo", "");
    } else if (personalPhotoFile) {
      formData.append("personal_photo", personalPhotoFile);
    }

    // Additional images
    imageSlots.forEach((slot, index) => {
      if (slot.deleted) {
        formData.append(`images[${index}]`, "");
      } else if (slot.file) {
        formData.append(`images[${index}]`, slot.file);
      }
    });

    await postData(formData);
  };


  if (dataLoading && !initialData && !userInfo?.id) return <Loader />;

  // Get the current form values to check if select fields have values
  const formValues = form.watch();

  return (
    <div className="w-full pb-20 px-4 md:p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Photo */}
          <div className="p-6 rounded-lg border bg-white dark:bg-gray-900">
            <div className="flex items-center gap-3 mb-6">
              <Camera className="w-6 h-6" />
              <h3 className="text-xl font-semibold">Personal Photo</h3>
            </div>

            <ProfileImageUploader
              initialImage={documents?.personal_photo || null}
              onChange={(file) => {
                setPersonalPhotoFile(file);
                if (file === null && !!documents?.personal_photo) {
                  setPersonalPhotoDeleted(true);
                } else {
                  setPersonalPhotoDeleted(false);
                }
              }}
            />
          </div>

          {/* Basic Information */}
          <div className="p-6 rounded-lg border bg-white dark:bg-gray-900">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6" />
              <h3 className="text-xl font-semibold">Basic Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="first_name"
                label="First Name"
                placeholder="John"
                iconSrc={ICONS.userInput}
              />

              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="last_name"
                label="Last Name"
                placeholder="Doe"
                iconSrc={ICONS.userInput}
              />

              {/* Fixed: Always show selected value */}
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="gender"
                label="Gender"
                placeholder={formValues.gender ? "" : "Select gender"}
                options={genderOptions}
                value={formValues.gender} // Ensure value prop is passed
              />

              <CustomFormField
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                name="birth_day"
                label="Date of Birth"
                placeholder="Select your birth date"
              />
            </div>
          </div>

          {/* Location */}
          <div className="p-6 rounded-lg border bg-white dark:bg-gray-900">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-6 h-6" />
              <h3 className="text-xl font-semibold">Location</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Fixed: Use value prop and conditional placeholder */}
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="Country_id"
                label="Country"
                placeholder={formValues.Country_id ? "" : "Select your country"}
                options={countryOptions}
                value={formValues.Country_id}
              />

              {/* Fixed: Only show when country is selected */}
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="city_id"
                label="City"
                placeholder={formValues.city_id ? "" : "Select your city"}
                options={cityOptions}
                value={formValues.city_id}
                disabled={!formValues.Country_id} // Optional: disable until country is selected
              />
            </div>
          </div>

          {/* Contact */}
          <div className="p-6 rounded-lg border bg-white dark:bg-gray-900">
            <h3 className="text-xl font-semibold mb-6">Contact Information</h3>

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label="Email Address"
              placeholder="john@gmail.com"
              iconSrc={ICONS.email}
              disabled
            />

            <div className="mt-4">
              <CustomFormField
                fieldType={FormFieldType.PHONE_INPUT}
                control={form.control}
                name="phone"
                label="Phone Number"
              />
            </div>
          </div>

          {/* Additional Images */}
          <div className="p-6 rounded-lg border bg-white dark:bg-gray-900">
            <div className="flex items-center gap-3 mb-6">
              <Camera className="w-6 h-6" />
              <h3 className="text-xl font-semibold">Additional Images</h3>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[0, 1, 2, 3].map((index) => (
                <SingleImageUploader
                  key={`image-${index}`}
                  label={`Image ${index + 1}`}
                  existingImage={imageSlots[index]?.existingUrl || null}
                  imageKey={`image_${index + 1}`}
                  onImageChange={(file, deleted) =>
                    handleSlotChange(index, file, deleted)
                  }
                />
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="p-6 rounded-lg border bg-white dark:bg-gray-900">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6" />
              <h3 className="text-xl font-semibold">Account Security</h3>
            </div>

            <div className="p-4 rounded-lg border bg-gray-50 dark:bg-gray-800">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <Key className="w-4 h-4" />
                    <h4 className="font-semibold">Password</h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Last changed: Recently
                  </p>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsPasswordModalOpen(true)}
                >
                  Change Password
                </Button>
              </div>
            </div>

            <ChangePasswordModal
              open={isPasswordModalOpen}
              onClose={() => setIsPasswordModalOpen(false)}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>

            <SubmitButton
              isLoading={submitLoading}
              loadingText="Updating Profile..."
              type="submit"
              className="w-full sm:w-auto"
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