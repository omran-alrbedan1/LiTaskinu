"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Save,
  Image as ImageIcon,
  Calendar,
  Settings,
  Info,
  Check,
  Languages,
  Globe,
  Crown,
} from "lucide-react";
import Link from "next/link";
import CustomFormField, {
  FormFieldType,
} from "@/components/shared/CustomInput";
import CustomUpload from "@/components/shared/CustomUpload";
import { BsAspectRatio } from "react-icons/bs";
import { useLocale } from "next-intl";
import SubmitButton from "@/components/Buttons/SubmitButton";
import useGetData from "@/hooks/useGetData";

// Validation schema for multilingual ads
export const AdFormValidation = z.object({
  // English fields
  title_en: z
    .string()
    .min(1, "English title is required")
    .max(100, "Title is too long"),
  content_en: z
    .string()
    .min(1, "English content is required")
    .max(500, "Content is too long"),

  // Arabic fields
  title_ar: z
    .string()
    .min(1, "Arabic title is required")
    .max(100, "Title is too long"),
  content_ar: z
    .string()
    .min(1, "Arabic content is required")
    .max(500, "Content is too long"),

  // Schedule fields
  start_date: z.union([z.string(), z.date()]).optional(),
  end_date: z.union([z.string(), z.date()]).optional(),

  status: z.enum(["active", "inactive"]),

  is_premium: z.enum(["0", "1"]),

  country_ids: z.array(z.string()).optional(),
});

export type AdFormValues = z.infer<typeof AdFormValidation>;

// Extended interface for form data that includes image file
export interface AdFormSubmitData {
  formValues: AdFormValues;
  imageFile: File | null;
}

interface AdFormProps {
  mode: "create" | "edit";
  initialData?: Partial<AdFormValues> & {
    id?: number;
    image?: string;
    is_premium?: boolean | number | string;
    country_ids?: number[] | string[];
  };
  onSubmit: (data: AdFormSubmitData) => Promise<void>;
  isLoading?: boolean;
  error?: string;
}

export const AdForm: React.FC<AdFormProps> = ({
  mode,
  initialData,
  onSubmit,
  isLoading = false,
  error,
}) => {
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string>(
    initialData?.image
      ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${initialData.image}`
      : ""
  );
  const locale = useLocale();

  // Fetch countries data
  const {
    data: countries,
    loading: isFetchingCountries,
    error: fetchError,
  } = useGetData<Country[]>({
    url: "/api/public/countries",
    enabled: true,
  });

  // Prepare countries data for the select component
  const countriesData = React.useMemo(() => {
    return (
      countries?.map((country) => ({
        value: country.id.toString(),
        label: `${country.name}`,
        code: country.code,
      })) || []
    );
  }, [countries]);

  // Format initial data for country_ids (convert numbers to strings for form)
  const formatInitialCountryIds = React.useMemo(() => {
    if (!initialData?.country_ids) return [];

    if (Array.isArray(initialData.country_ids)) {
      return initialData.country_ids.map((id) => id.toString());
    }
    return [];
  }, [initialData?.country_ids]);

  // Format initial is_premium value (convert to string "0" or "1")
  const formatInitialIsPremium = React.useMemo(() => {
    if (initialData?.is_premium === undefined) return "0";

    // If it's already a string "0" or "1", use it directly
    if (initialData.is_premium === "0" || initialData.is_premium === "1") {
      return initialData.is_premium;
    }

    // If it's boolean or number, convert to "0" or "1"
    const isPremium =
      initialData.is_premium === true ||
      initialData.is_premium === 1 ||
      initialData.is_premium === "1" ||
      initialData.is_premium === "true";

    return isPremium ? "1" : "0";
  }, [initialData?.is_premium]);

  // Log initial data to understand the structure
  React.useEffect(() => {
    console.log("Initial Data:", initialData);
    console.log("Formatted is_premium:", formatInitialIsPremium);
    console.log("Formatted country_ids:", formatInitialCountryIds);
  }, [initialData, formatInitialIsPremium, formatInitialCountryIds]);

  // Create default values object
  const defaultValues = React.useMemo(() => {
    return {
      title_en: initialData?.title_en || "",
      content_en: initialData?.content_en || "",
      title_ar: initialData?.title_ar || "",
      content_ar: initialData?.content_ar || "",
      start_date: initialData?.start_date || "",
      end_date: initialData?.end_date || "",
      status: initialData?.status || "active",
      is_premium: formatInitialIsPremium as "0" | "1",
      country_ids: formatInitialCountryIds,
    };
  }, [initialData, formatInitialIsPremium, formatInitialCountryIds]);

  const form = useForm<AdFormValues>({
    resolver: zodResolver(AdFormValidation),
    defaultValues: defaultValues as AdFormValues,
  });

  const handleImageSelect = (file: File | null) => {
    setImageFile(file);
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      setImagePreview(
        initialData?.image
          ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${initialData.image}`
          : ""
      );
    }
  };

  const handleSubmit = async (formValues: AdFormValues) => {
    console.log("Submitting form values:", formValues);
    console.log("Image file:", imageFile ? "Yes" : "No");
    console.log("is_premium value:", formValues.is_premium);
    console.log("is_premium type:", typeof formValues.is_premium);

    await onSubmit({
      formValues,
      imageFile,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        {/* Multilingual Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#A1AA8A]/20 dark:bg-[#c77971]/20 rounded flex items-center justify-center">
                <Languages className="w-4 h-4 text-primary-color1" />
              </div>
              Ad Information (Multilingual)
            </CardTitle>
            <CardDescription>
              Enter advertisement details in both English and Arabic
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* English Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded flex items-center justify-center">
                  <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
                    EN
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  English
                </h4>
              </div>
              <div className="grid gap-4">
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="title_en"
                  label="Ad Title (English)"
                  placeholder="Enter ad title in English"
                  disabled={isLoading}
                />

                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  name="content_en"
                  label="Content (English)"
                  placeholder="Describe your advertisement in English"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Arabic Section */}
            <div className="space-y-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded flex items-center justify-center">
                  <span className="text-xs font-medium text-green-700 dark:text-green-300">
                    AR
                  </span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  Arabic
                </h4>
              </div>
              <div className="grid gap-4">
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="title_ar"
                  label="Ad Title (Arabic)"
                  placeholder="أدخل عنوان الإعلان بالعربية"
                  disabled={isLoading}
                />

                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  control={form.control}
                  name="content_ar"
                  label="Content (Arabic)"
                  placeholder="صف إعلانك باللغة العربية"
                  disabled={isLoading}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schedule & Settings Card */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#A1AA8A]/20 dark:bg-[#c77971]/20 rounded flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-primary-color1" />
                </div>
                Schedule
              </CardTitle>
              <CardDescription>
                Set the active period for your ad
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <CustomFormField
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                name="start_date"
                label="Start Date"
                placeholder="Select start date"
                disabled={isLoading}
              />

              <CustomFormField
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                name="end_date"
                label="End Date"
                placeholder="Select end date"
                disabled={isLoading}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#A1AA8A]/20 dark:bg-[#c77971]/20 rounded flex items-center justify-center">
                  <Settings className="w-4 h-4 text-primary-color1" />
                </div>
                Settings
              </CardTitle>
              <CardDescription>Configure ad preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  control={form.control}
                  name="status"
                  placeholder="Select status"
                  options={[
                    { value: "active", label: "Active" },
                    { value: "inactive", label: "Paused" },
                  ]}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="is_premium" className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-yellow-500" />
                  Target Users
                </Label>
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  control={form.control}
                  name="is_premium"
                  placeholder="Select target users"
                  options={[
                    { value: "0", label: "All Users" },
                    { value: "1", label: "Premium Users Only" },
                  ]}
                  disabled={isLoading}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Countries Card - Simplified */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#A1AA8A]/20 dark:bg-[#c77971]/20 rounded flex items-center justify-center">
                <Globe className="w-4 h-4 text-primary-color1" />
              </div>
              Target Countries
            </CardTitle>
            <CardDescription>
              Select countries where this ad should be shown
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <CustomFormField
                fieldType={FormFieldType.MULTI_SELECT}
                control={form.control}
                name="country_ids"
                label="Countries"
                placeholder="Select countries"
                options={countriesData}
                disabled={isLoading || isFetchingCountries}
              />
              {isFetchingCountries && (
                <p className="text-sm text-gray-500">Loading countries...</p>
              )}
              {fetchError && (
                <p className="text-sm text-red-500">
                  Error loading countries: {fetchError}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Media Upload Card - KEPT EXACTLY THE SAME */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#A1AA8A]/20 dark:bg-[#c77971]/20 rounded flex items-center justify-center">
                <ImageIcon className="w-4 h-4 text-primary-color1" />
              </div>
              Media
            </CardTitle>
            <CardDescription>
              Upload visual content for your advertisement
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Upload Area - KEPT EXACTLY THE SAME */}
              <div className="space-y-4">
                <CustomUpload
                  onFileSelect={handleImageSelect}
                  acceptedFileTypes="image/*"
                  maxFileSize={10}
                  previewUrl={imagePreview}
                  label="Drop your image here"
                  description="PNG, JPG, GIF up to 10MB"
                  required={mode === "create"}
                />
                {mode === "edit" && initialData?.image && !imageFile && (
                  <p className="text-sm text-muted-foreground">
                    Current image will be kept if no new image is selected.
                  </p>
                )}
              </div>

              {/* Preview & Guidelines - KEPT EXACTLY THE SAME */}
              <div className="space-y-4">
                <div className="rounded-xl p-5 border border-blue-100 dark:border-gray-700">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-[#A1AA8A]/20 dark:bg-[#c77971]/20 rounded-lg flex items-center justify-center">
                      <Info className="w-5 h-5 text-primary-color1" />
                    </div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
                      Image Guidelines
                    </h4>
                  </div>
                  <ul className="space-y-4 ml-2">
                    <li className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                      <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                      </div>
                      <span>
                        Recommended size: <strong>1200×600px</strong>
                      </span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                      <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                        <ImageIcon className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span>
                        Formats: <strong>PNG, JPG, GIF</strong>
                      </span>
                    </li>
                    <li className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                      <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                        <BsAspectRatio className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                      </div>
                      <span>
                        Aspect ratio: <strong>2:1</strong>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Form Validation Errors */}
        {Object.keys(form.formState.errors).length > 0 && (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">
              Please fix the following errors:
            </h4>
            <ul className="list-disc list-inside space-y-1">
              {Object.entries(form.formState.errors).map(([key, error]) => (
                <li key={key} className="text-yellow-700 text-sm">
                  {error?.message as string}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* API Error Display */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <Link href={`/admin/${locale}/ads`}>
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              type="button"
              disabled={isLoading}
            >
              Cancel
            </Button>
          </Link>
          <SubmitButton
            isLoading={isLoading}
            disabled={!form.formState.isValid}
            icon={Save}
            loadingText={mode === "create" ? "Creating..." : "Updating..."}
          >
            {mode === "create"
              ? "Create Advertisement"
              : "Update Advertisement"}
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
};
