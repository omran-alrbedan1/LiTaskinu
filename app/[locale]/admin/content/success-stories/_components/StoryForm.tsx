"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/shared/CustomInput";
import SubmitButton from "@/components/Buttons/SubmitButton";
import RichTextEditor from "@/components/shared/RichTextEditor";
import { ICONS } from "@/constants/icons";
import { SuccessStoryFormValidation, SuccessStoryFormValues } from "@/validation/admin";
import { useEffect, useState } from "react";
import useGetData from "@/hooks/useGetData";

interface Country {
  id: number;
  name: string;
  code: string;
}

interface City {
  id: number;
  name: string;
}

interface SuccessStoryFormProps {
  onSubmit: (data: SuccessStoryFormValues) => Promise<void>;
  onCancel?: () => void;
  initialData?: any;
  isEdit?: boolean;
  isLoading?: boolean;
}

export default function SuccessStoryForm({
  onSubmit,
  onCancel,
  initialData,
  isEdit = false,
  isLoading = false,
}: SuccessStoryFormProps) {
  // Track when data is ready
  const [isDataReady, setIsDataReady] = useState(false);
  
  // Initialize form
  const form = useForm<SuccessStoryFormValues>({
    resolver: zodResolver(SuccessStoryFormValidation),
    defaultValues: {
      name_male: "",
      name_female: "",
      description: "",
      testimonial: "",
      rating: "",
      country_id: "",
      city_id: "",
    },
  });

  const {
    data: countries,
    loading: isFetchingCountries,
  } = useGetData<Country[]>({
    url: "/api/public/countries",
    enabled: true,
  });

  const countriesData = countries?.map((country) => ({
    value: country.id.toString(),
    label: country.name,
    code: country.code,
  })) || [];

  const {
    data: cities,
    loading: isFetchingCities,
  } = useGetData<City[]>({
    url: "/api/public/cities",
    enabled: true,
  });

  const citiesData = cities?.map((city) => ({
    value: city.id.toString(),
    label: city.name,
  })) || [];

  // Rating options
  const ratingOptions = [
    { value: "1", label: "1 Star" },
    { value: "2", label: "2 Stars" },
    { value: "3", label: "3 Stars" },
    { value: "4", label: "4 Stars" },
    { value: "5", label: "5 Stars" },
  ];

  useEffect(() => {
    if (initialData && !isFetchingCountries && !isFetchingCities) {
      
      const formattedData = {
        ...initialData,
        rating: initialData.rating?.toString() || "",
        country_id: initialData.country_id?.toString() || "",
        city_id: initialData.city_id?.toString() || "",
      };
      
      
      setTimeout(() => {
        form.reset(formattedData);
        setIsDataReady(true);
 
      }, 100);
    }
  }, [initialData, isFetchingCountries, isFetchingCities, form]);


  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <Form {...form}   >
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3"
        >
          {/* Couple Names */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="name_male"
              label="Male Partner Name"
              placeholder="Enter male partner's name"
              iconSrc={ICONS.user}
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="name_female"
              label="Female Partner Name"
              placeholder="Enter female partner's name"
              iconSrc={ICONS.user}
            />
          </div>

          {/* Rating and Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="rating"
              label="Rating"
              placeholder="Select rating"
              options={ratingOptions}
            />

            <div className="grid grid-cols-2 gap-4">
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="country_id"
                label="Country"
                placeholder={isFetchingCountries ? "Loading countries..." : "Select country"}
                options={countriesData}
                disabled={isFetchingCountries}
              />

              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="city_id"
                label="City"
                placeholder={isFetchingCities ? "Loading cities..." : "Select city"}
                options={citiesData}
                disabled={isFetchingCities}
              />
            </div>
          </div>

          {/* Description - Rich Text Editor */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Story Description *
            </label>
            <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
              <RichTextEditor
                value={form.watch("description")}
                onChange={(value) => form.setValue("description", value)}
                placeholder="Write the inspiring success story..."
              />
            </div>
            {form.formState.errors.description && (
              <p className="text-sm text-red-500">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>

          {/* Testimonial */}
          <div className="space-y-3">
            <CustomFormField
              fieldType={FormFieldType.TEXTAREA}
              control={form.control}
              name="testimonial"
              label="Couple Testimonial"
              placeholder="Share what the couple said about their experience..."
              className="min-h-[120px]"
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                disabled={isLoading}
                className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
            )}
            
            <SubmitButton
              loadingText={isEdit ? "Updating..." : "Creating..."}
              isLoading={isLoading}
              className="text-white rounded-lg"
            >
              {isEdit ? "Update Story" : "Create Story"}
            </SubmitButton>
          </div>
        </form>
      </Form>
    </div>
  );
}