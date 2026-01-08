"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ICONS } from "@/constants/icons";
import { genderOptions } from "@/constants/options";
import CustomFormField, {
  FormFieldType,
} from "@/components/shared/CustomInput";
import SubmitButton from "@/components/Buttons/SubmitButton";
import useGetData from "@/hooks/useGetData";
import usePostData from "@/hooks/usePostData";
import { Calendar, Key, Shield, Camera, MapPin, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import ChangePasswordModal from "./ChangePasswordModal";
import ImageUploader from "./ImageUploader";
import ProfileImageUploader from "./ProfileImageUploader";
import { profileBasicInfo } from "@/validation/profile-schema";
import Loader from "@/components/shared/Loader";
import { cn } from "@/lib/utils";

interface EditProfileFormProps {
  initialData?: BasicProfileInfo;
}

const EditProfileForm = ({ initialData }: EditProfileFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [personalPhotoFile, setPersonalPhotoFile] = useState<File | null>(null);
  const [additionalImagesFiles, setAdditionalImagesFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [isFormInitialized, setIsFormInitialized] = useState(false);
  const [userCityId, setUserCityId] = useState<string | null>(null);
  const [userCountryId, setUserCountryId] = useState<string | null>(null);
  
  const router = useRouter();

  // Fetch user data
  const {
    data: userData,
    loading: dataLoading,
    error: dataError,
    refetch,
  } = useGetData<BasicProfileInfo>({
    url: "/api/website/profile/basic",
  });

  const userInfo = userData?.data || initialData || {};

  // Date formatting helper
  const formatDateForForm = (dateString: string | null): Date | string => {
    if (!dateString) return "";
    try {
      return new Date(dateString);
    } catch {
      return "";
    }
  };

  // Initialize form with default values
  const form = useForm<z.infer<typeof profileBasicInfo>>({
    resolver: zodResolver(profileBasicInfo),
    defaultValues: {
      first_name: "",
      last_name: "",
      gender: "",
      birth_day: "",
      country_id: "",
      city_id: "",
      email: "",
      phone: "",
    },
    mode: "onChange",
  });

  // Watched values
  const watchedCountryId = form.watch("country_id");

  // Fetch countries
  const {
    data: countries,
    loading: isFetchingCountries,
    error: fetchCountriesError,
  } = useGetData<Country[]>({
    url: "/api/public/countries",
    enabled: true,
  });

  // Fetch cities based on selected country
  const {
    data: cities,
    loading: isFetchingCities,
    error: fetchCitiesError,
    refetch: refetchCities,
  } = useGetData<City[]>({
    url: '/api/public/cities',
    enabled: !!watchedCountryId || !!userCountryId,
  });

  // Format countries data for select
  const countriesData = useMemo(() => 
    countries?.map((country: Country) => ({
      value: country.id.toString(),
      label: country.name,
      code: country.code,
    })) || [],
    [countries]
  );

  // Format cities data for select
  const citiesData = useMemo(() => 
    cities?.map((city: City) => ({
      value: city.id.toString(),
      label: city.name,
    })) || [],
    [cities]
  );

  // Submit handler
  const {
    postData,
    loading: submitLoading,
    success: submitSuccess,
  } = usePostData("/api/website/profile/basic", {
    showNotifications: true,
    successMessage: "Profile updated successfully!",
    onSuccess: () => {
      refetch();
    },
  });

  // Initialize form with user data
  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length > 0 && !isFormInitialized) {
      const preparedValues = {
        first_name: userInfo.first_name || "",
        last_name: userInfo.last_name || "",
        gender: userInfo.gender || "",
        birth_day: formatDateForForm(userInfo.birth_day),
        country_id: userInfo.country_id ? userInfo.country_id.toString() : "",
        city_id: userInfo.city_id ? userInfo.city_id.toString() : "",
        email: userInfo.email || "",
        phone: userInfo.phone ? userInfo.phone.toString() : "",
      };

      // Store original location IDs for comparison
      setUserCityId(userInfo.city_id ? userInfo.city_id.toString() : null);
      setUserCountryId(userInfo.country_id ? userInfo.country_id.toString() : null);

      // Reset form with user data
      form.reset(preparedValues);
      setIsFormInitialized(true);

      // Initialize images
      if (userInfo?.documents?.images) {
        const validImages = userInfo.documents.images.filter(
          (img: any): img is string => img !== null && img !== ""
        );
        setExistingImages(validImages);
      }
    }
  }, [userInfo, form, isFormInitialized]);

  // Refetch cities when country changes
  useEffect(() => {
    if (watchedCountryId && watchedCountryId !== "") {
      refetchCities();
      
      // Clear city if user switches to a different country
      if (userCityId && watchedCountryId !== userCountryId) {
        form.setValue("city_id", "");
      }
    }
  }, [watchedCountryId, refetchCities, form, userCityId, userCountryId]);

  // Handlers for file uploads
  const handlePersonalPhotoChange = (file: File | null) => {
    setPersonalPhotoFile(file);
  };

  const handleAdditionalImagesChange = (files: File[], existingUrls: string[]) => {
    setAdditionalImagesFiles(files);
    setExistingImages(existingUrls);
  };

  // Format date for API submission
  const formatDateForApi = (dateValue: any): string | null => {
    if (!dateValue) return null;
    
    try {
      if (typeof dateValue === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
        return dateValue;
      }
      
      if (dateValue instanceof Date) {
        return dateValue.toISOString().split('T')[0];
      }
      
      const date = new Date(dateValue);
      if (!isNaN(date.getTime())) {
        return date.toISOString().split('T')[0];
      }
      
      return null;
    } catch {
      return null;
    }
  };

  // Form submission
  const onSubmit = async (values: z.infer<typeof profileBasicInfo>) => {
    setIsLoading(true);
    
    try {
      // Prepare FormData
      const formData = new FormData();
      
      // Append basic information
      const fields = [
        'first_name',
        'last_name', 
        'gender',
        'email',
        'phone',
        'country_id',
        'city_id'
      ] as const;
      
      fields.forEach(field => {
        if (values[field]) {
          formData.append(field, values[field].toString());
        }
      });
      
      // Format and append birth date
      const formattedBirthDay = formatDateForApi(values.birth_day);
      if (formattedBirthDay) {
        formData.append('birth_day', formattedBirthDay);
      }
      
      // Handle personal photo
      if (personalPhotoFile) {
        formData.append('personal_photo', personalPhotoFile);
      } else if (userInfo?.documents?.personal_photo) {
        formData.append('existing_personal_photo', userInfo.documents.personal_photo);
      }
      
      // Handle additional images
      additionalImagesFiles.forEach((file, index) => {
        formData.append(`images[${index}]`, file);
      });
      
      existingImages.forEach((url, index) => {
        formData.append(`existing_images[${index}]`, url);
      });

      // Submit data
      await postData(formData);
      
    } catch (error) {
      console.error("Submit error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state
  if (dataLoading && !initialData) {
    return <Loader />;
  }

  const sectionClasses = cn(
    "p-6 rounded-lg border",
    "bg-white dark:bg-gray-900",
    "border-gray-200 dark:border-gray-800",
  );



  const sectionDescriptionClasses = cn(
    "text-sm",
    "text-gray-600 dark:text-gray-400"
  );

 
  const cardClasses = cn(
    "p-4 rounded-lg border",
    "bg-gray-50 dark:bg-gray-800",
    "border-gray-200 dark:border-gray-700"
  );

  return (
    <div className="w-full pb-20 px-4 md:p-6 md:pb-20">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Photo Section */}
          <div className={sectionClasses}>
            <div className="flex items-center gap-3 mb-6">
              <Camera className={'w-6 h-6'} />
              <h3 className={'text-xl font-semibold text-gray-600 dark:text-gray-300'}>Personal Photo</h3>
            </div>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex-1">
                <p className={cn("text-sm mb-4 text-gray-600 dark:text-gray-300")}>
                  Upload your main profile picture. This will be the primary image shown on your profile.
                </p>
                <ProfileImageUploader
                  initialImage={userInfo?.documents?.personal_photo}
                  onChange={handlePersonalPhotoChange}
                  maxSize={5}
                />
              </div>
            </div>
          </div>

          {/* Basic Information Section */}
          <div className={sectionClasses}>
            <div className="flex items-center gap-3 mb-6">
              <User className={'w-6 h-6'} />
              <h3 className={'text-xl font-medium text-gray-600 dark:text-gray-300'}>Basic Information</h3>
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="gender"
                label="Gender"
                placeholder="Select gender"
                options={genderOptions}
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

          {/* Location Information */}
          <div className={sectionClasses}>
            <div className="flex items-center gap-3 mb-6">
              <MapPin className={'w-6 h-6'} />
              <h3 className={'text-xl font-medium text-gray-600 dark:text-gray-300'}>Location Information</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="country_id"
                label="Country"
                placeholder="Select your country"
                options={countriesData}
                disabled={isFetchingCountries}
              />

              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="city_id"
                label="City"
                placeholder={
                  !watchedCountryId && !userCountryId
                    ? "Select country first"
                    : isFetchingCities
                    ? "Loading cities..."
                    : "Select your city"
                }
                options={citiesData}
                disabled={(!watchedCountryId && !userCountryId) || isFetchingCities}
              />
            </div>
          </div>

          {/* Contact Information Section */}
          <div className={sectionClasses}>
            <h3 className={cn("font-semibold mb-6", 'text-xl font-medium text-gray-600 dark:text-gray-300')}>
              Contact Information
            </h3>

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

          {/* Additional Images Section */}
          <div className={sectionClasses}>
            <div className="flex items-center gap-3 mb-6">
              <Camera className={'w-6 h-6'} />
              <h3 className={'text-xl font-medium text-gray-600 dark:text-gray-300'}>Additional Profile Images</h3>
            </div>

            <p className={cn("text-sm mb-6 text-gray-600 dark:text-gray-300")}>
              Upload up to 4 additional images to showcase more about yourself. These will be displayed in your profile gallery.
            </p>

            <ImageUploader
              existingImages={existingImages}
              onChange={handleAdditionalImagesChange}
              maxImages={4}
            />
          </div>

          {/* Security Section */}
          <div className={sectionClasses}>
            <div className="flex items-center gap-3 mb-6">
              <Shield className={'w-6 h-6'} />
              <h3 className={'text-xl font-medium text-gray-600 dark:text-gray-300'}>Account Security</h3>
            </div>

            <div className="space-y-4">
              {/* Password Change Card */}
              <div className={cardClasses}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Key className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">Password</h4>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="w-3 h-3" />
                      <span>Last changed: Recently</span>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsPasswordModalOpen(true)}
                    className={cn(
                      "flex items-center gap-2 whitespace-nowrap",
                      "border-primary-color1 dark:border-primary-color2",
                      "text-primary-color1 dark:text-primary-color2",
                      "hover:bg-primary-color1 hover:text-white",
                      "dark:hover:bg-primary-color2 dark:hover:text-white",
                      "transition-colors"
                    )}
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
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end items-center gap-3 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className={cn(
                "w-full sm:w-auto px-6 py-2.5 rounded-lg",
                "border border-gray-300 dark:border-gray-700",
                "text-gray-600 dark:text-gray-400",
                "hover:bg-gray-50 dark:hover:bg-gray-800",
                "hover:text-gray-800 dark:hover:text-gray-200",
                "transition-all duration-200"
              )}
            >
              Cancel
            </Button>

            <SubmitButton
              isLoading={isLoading || submitLoading}
              loadingText="Updating Profile..."
              type="submit"
              className={cn(
                "w-full sm:w-auto px-8 py-2.5 rounded-lg shadow-sm",
                "bg-primary-color1 dark:bg-primary-color2",
                "text-white",
                "hover:bg-primary-color2 dark:hover:bg-primary-color1",
                "transition-all duration-200"
              )}
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