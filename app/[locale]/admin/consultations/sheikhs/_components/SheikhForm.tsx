"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/shared/CustomInput";
import SubmitButton from "@/components/Buttons/SubmitButton";
import { Plus, Edit, User, BookOpen, FileText } from "lucide-react";
import { ICONS } from "@/constants/icons";
import { useEffect, useState } from "react";
import CustomUpload from "@/components/shared/CustomUpload";
import { useGenderOptions } from "@/constants/options";
import useGetData from "@/hooks/useGetData";
import { SheikhFormData, SheikhFormValidation } from "@/validation/admin";
import { genderOptions } from "@/constants/options";

interface SheikhFormProps {
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isLoading?: boolean;
  initialData?: any;
  isEdit?: boolean;
}

export function SheikhForm({
  onSubmit,
  onCancel,
  isLoading = false,
  initialData,
  isEdit = false,
}: SheikhFormProps) {
  const [selectedCountryId, setSelectedCountryId] = useState<string>("");
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
    const genderOptions = useGenderOptions();

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>(
        initialData?.image 
            ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ''}/${initialData.image}`
            : ""
    );

  // Fetch countries data
  const {
    data: countries,
    loading: isFetchingCountries,
    error: fetchCountriesError,
    refetch: refetchCountries,
  } = useGetData<Country[]>({
    url: "/api/public/countries",
    enabled: true,
  });

  // Fetch cities data based on selected country
  const {
    data: cities,
    loading: isFetchingCities,
    error: fetchCitiesError,
    refetch: refetchCities,
  } = useGetData<City[]>({
    url: selectedCountryId ? `/api/public/cities?country_id=${selectedCountryId}` : "/api/public/cities",
    enabled: true,
  });

  const form = useForm<SheikhFormData>({
    resolver: zodResolver(SheikhFormValidation),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      experience: "",
      specialization: "",
      languages: [],
      bio: "",
      gender: "male",
      country_id: "",
      city_id: "",
      phone: "",
    },
  });

  // Watch country_id to fetch cities when country changes
  const watchCountryId = form.watch("country_id");

  // Update cities when country changes
  useEffect(() => {
    if (watchCountryId) {
      setSelectedCountryId(watchCountryId);
      // Reset city when country changes
      form.setValue("city_id", "");
    }
  }, [watchCountryId, form]);

  // Set form values when editing
  // Set form values when editing
  useEffect(() => {
    if (initialData && isEdit) {
      console.log("Initial data for edit (nested response):", initialData);

      // Extract values from the NESTED response structure
      const formValues = {
        first_name: initialData.first_name || "",
        last_name: initialData.last_name || "",
        email: initialData.email || "",
        password: "", 
        experience: initialData.sheikh?.experience || "",
        specialization: initialData.sheikh?.specialization || "",
        languages: Array.isArray(initialData.sheikh?.languages)
          ? initialData.sheikh.languages
          : (initialData.sheikh?.languages || "").split(',').map((lang: string) => lang.trim()).filter(Boolean),
        bio: initialData.sheikh?.bio || "",
        gender: initialData.gender || "male",
        country_id: initialData.sheikh?.country_id?.toString() || "", // Convert to string
        city_id: initialData.sheikh?.city_id?.toString() || "", // Convert to string
        phone: initialData.phone?.toString() || "", // Convert phone to string
      };

      console.log("Extracted form values:", formValues);
      form.reset(formValues);

      if (initialData.sheikh?.country_id) {
        setSelectedCountryId(initialData.sheikh.country_id.toString());
      }
    } else {
      form.reset({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        experience: "",
        specialization: "",
        languages: [],
        bio: "",
        gender: "male",
        country_id: "",
        city_id: "",
        phone: "",
      });
    }
  }, [initialData, isEdit, form]);


  const handleSubmit = async (values: SheikhFormData) => {
    setIsFormSubmitting(true);

    try {
      // Prepare FLAT structure for API request
      const apiData: any = {
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        experience: values.experience,
        specialization: values.specialization,
        languages: values.languages,
        bio: values.bio,
        gender: values.gender,
      };

      if (values.country_id) {
        apiData.country_id = Number(values.country_id);
      }

      if (values.city_id) {
        apiData.city_id = Number(values.city_id);
      }

      if (values.phone) {
        apiData.phone = values.phone;
      }

      if ( values.password) {
        apiData.password = values.password;
      }

      if (isEdit && initialData?.id) {
        apiData.id = initialData.id;
      }

      console.log("Submitting FLAT data to API:", apiData);
      await onSubmit(apiData);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsFormSubmitting(false);
    }
  };


  // Transform countries data for select options
  const countriesData = countries?.map((country: Country) => ({
    value: country.id.toString(),
    label: country.name,
    code: country.code,
  })) || [];

  // Transform cities data for select options
  const filteredCities = selectedCountryId
    ? cities?.filter((city: City) => city.country_id.toString() === selectedCountryId)
    : cities || [];

  const citiesData = filteredCities?.map((city: City) => ({
    value: city.id.toString(),
    label: city.name,
  })) || [];

  // Check if the form is submitting
  const isSubmitting = isLoading || isFormSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={(e) => {
        console.log("Form onSubmit triggered!");
        console.log("Form state before submit:", form.getValues());
        console.log("Form errors before submit:", form.formState.errors);
        form.handleSubmit(handleSubmit)(e);
      }} className="space-y-6">
        {/* Personal Information Card */}
        <Card className="border-blue-200 dark:border-blue-800 bg-blue-50/20 dark:bg-blue-950/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-md">
                <User className="text-blue-600 dark:text-blue-400 size-4" />
              </div>
              <div>
                <CardTitle className="text-gray-900 dark:text-gray-100">
                  Personal Information
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Basic details and contact information
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="first_name"
                label="First Name"
                placeholder="Enter first name"
                iconSrc={ICONS.user}
                disabled={isSubmitting}
              />

              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="last_name"
                label="Last Name"
                placeholder="Enter last name"
                iconSrc={ICONS.user}
                disabled={isSubmitting}
              />

              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="gender"
                label="Gender"
                placeholder="Select gender"
                options={genderOptions}
                disabled={isSubmitting}
              />

              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="email"
                label="Email Address"
                placeholder="sheikh@example.com"
                iconSrc={ICONS.email}
                disabled={isSubmitting}
              />

                <CustomFormField
                  fieldType={FormFieldType.PASSWORD}
                  control={form.control}
                  name="password"
                  label="Password"
                  placeholder="Create a password "
                  iconSrc={ICONS.lock}
                  disabled={isSubmitting}
                />

              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="phone"
                label="Phone Number"
                placeholder="+1234567890"
                iconSrc={ICONS.phone}
                disabled={isSubmitting}
              />

              {/* Country Field */}
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="country_id"
                label="Country"
                placeholder="Select country"
                options={countriesData}
                disabled={isSubmitting || isFetchingCountries}
              />

              {/* City Field */}
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="city_id"
                label="City"
                placeholder="Select city"
                options={citiesData}
                disabled={!watchCountryId || isFetchingCities || isSubmitting}
              />
            </div>
          </CardContent>
        </Card>

        {/* Professional Information Card */}
        <Card className="border-purple-200 dark:border-purple-800 bg-purple-50/20 dark:bg-purple-950/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-md">
                <BookOpen className="text-purple-600 dark:text-purple-400 size-4" />
              </div>
              <div>
                <CardTitle className="text-gray-900 dark:text-gray-100">
                  Professional Information
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Expertise, experience, and specialization
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="experience"
              label="Experience"
              placeholder="e.g., 15 years of Islamic studies teaching, graduated from Al-Azhar University..."
              disabled={isSubmitting}
            />

            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="specialization"
              label="Specialization"
              placeholder="e.g., Tafseer, Hadith, Fiqh, Islamic Law, Quranic Studies..."
              disabled={isSubmitting}
            />

            <CustomFormField
              fieldType={FormFieldType.TAG_INPUT}
              control={form.control}
              name="languages"
              label="Languages"
              tagInputProps={{
                placeholder: "Add language (e.g., Arabic, English, Urdu)",
                addButtonText: "Add Language",
                maxTags: 5,
                allowDuplicates: false,
                separator: ",",
              }}
              disabled={isSubmitting}
            />
          </CardContent>
        </Card>

        {/* Biography Card */}
        <Card className="border-green-200 dark:border-green-800 bg-green-50/20 dark:bg-green-950/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 bg-green-100 dark:bg-green-900 rounded-md">
                <FileText className="text-green-600 dark:text-green-400 size-4" />
              </div>
              <div>
                <CardTitle className="text-gray-900 dark:text-gray-100">
                  Biography
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Detailed background and qualifications
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="bio"
              label="Biography"
              placeholder="Write a detailed biography including education, achievements, and teaching experience..."
              disabled={isSubmitting}
            />
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Cancel
          </Button>

          <SubmitButton
            isLoading={isSubmitting} // Pass the combined loading state
            loadingText={isEdit ? "Updating..." : "Creating..."}
            icon={isEdit ? Edit : Plus}
            disabled={isSubmitting}
          >
            {isEdit ? "Update Sheikh" : "Add Sheikh"}
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
}