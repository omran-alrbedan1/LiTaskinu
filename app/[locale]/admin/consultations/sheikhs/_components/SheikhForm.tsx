"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField, { FormFieldType } from "@/components/shared/CustomInput";
import SubmitButton from "@/components/Buttons/SubmitButton";
import { useEffect, useState } from "react";
import { Plus, Edit, User, Image as ImageIcon, BookOpen, FileText, MapPin, Globe } from "lucide-react";
import { ICONS } from "@/constants/icons";
import { SheikhFormValidation } from "@/validation/admin";
import CustomUpload from "@/components/shared/CustomUpload";
import { genderOptions } from "@/constants/options";
import useGetData from "@/hooks/useGetData";

interface SheikhFormProps { 
    onSubmit: (data: Sheikh) => void;
    onCancel: () => void;
    isLoading?: boolean;
    initialData?: Sheikh | null;
    isEdit?: boolean;
}

export function SheikhForm({
    onSubmit,
    onCancel,
    isLoading = false,
    initialData,
    isEdit = false,
}: SheikhFormProps) {
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

    const [selectedCountryId, setSelectedCountryId] = useState<string>("");

  const {
    data: cities,
    loading: isFetchingCities,
    error: fetchCitiesError,
    refetch: refetchCities,
  } = useGetData<City[]>({
    url: "/api/public/cities",
    enabled: true,
  });


    // Transform countries data for select options
    const countriesData = countries?.map((country:Country) => ({
        value: country.id.toString(),
        label: country.name,
        code: country.code,
    })) || [];

    // Transform cities data for select options
    const citiesData = cities?.map((city:City) => ({
        value: city.id.toString(),
        label: city.name,
    })) || [];

    const form = useForm<z.infer<typeof SheikhFormValidation>>({
        resolver: zodResolver(SheikhFormValidation),
        defaultValues: {
            first_name: "",
            last_name: "",
            gender: "",
            email: "",
            username: "",
            password: "",
            phone: "",
            image: "",
            country_id: "",
            city_id: "",
            experience: "",
            specialization: "", // Always string
            languages: [],
            bio: "",
        },
    });

    // Watch country_id to fetch cities when country changes
    const watchCountryId = form.watch("country_id");

    // Fetch cities when country is selected
    useEffect(() => {
        if (watchCountryId) {
            setSelectedCountryId(watchCountryId);
            // Reset city when country changes
            form.setValue("city_id", "");
        }
    }, [watchCountryId, form]);

    // Set form values when editing
    useEffect(() => {
        if (initialData && isEdit) {
            // specialization is always string, no need to convert from array
            const specializationString = initialData.specialization || "";

            // Set selected country ID to fetch cities
            if (initialData.country_id) {
                setSelectedCountryId(initialData.country_id.toString());
            }

            form.reset({
                first_name: initialData.first_name || "",
                last_name: initialData.last_name || "",
                gender: initialData.gender || "",
                email: initialData.email || "",
                username: initialData.username || "",
                phone: initialData.phone || "",
                image: initialData.image || "",
                country_id: initialData.country_id?.toString() || "",
                city_id: initialData.city_id?.toString() || "",
                experience: initialData.experience || "",
                specialization: specializationString, // String
                languages: initialData.languages || [],
                bio: initialData.bio || "",
            });
            setImagePreview(
                initialData.image 
                    ? `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL || ''}/${initialData.image}`
                    : ""
            );
        }
    }, [initialData, isEdit, form]);

    const handleImageFileSelect = (file: File | null) => {
        setImageFile(file);

        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
            form.setValue("image", file.name);
        } else {
            setImagePreview("");
            form.setValue("image", "");
        }
    };

    const handleSubmit = (values: z.infer<typeof SheikhFormValidation>) => {
        const sheikhData = {
            id: initialData?.id || 0,
            first_name: values.first_name,
            last_name: values.last_name,
            name: `${values.first_name} ${values.last_name}`.trim(),
            gender: values.gender,
            email: values.email,
            username: values.username,
            password: isEdit ? undefined : values.password,
            phone: values.phone,
            image: values.image || "/placeholder-avatar.jpg",
            country_id: Number(values.country_id),
            city_id: Number(values.city_id),
            experience: values.experience,
            specialization: values.specialization, 
            languages: values.languages,
            bio: values.bio,
            created_at: initialData?.created_at || new Date().toISOString(),
        };
        
        onSubmit(sheikhData);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
                            />

                            <CustomFormField
                                fieldType={FormFieldType.INPUT}
                                control={form.control}
                                name="last_name"
                                label="Last Name"
                                placeholder="Enter last name"
                                iconSrc={ICONS.user}
                            />

                            <CustomFormField
                                fieldType={FormFieldType.SELECT}
                                control={form.control}
                                name="gender"
                                label="Gender"
                                placeholder="Select gender"
                                options={genderOptions}
                            />

                            <CustomFormField
                                fieldType={FormFieldType.INPUT}
                                control={form.control}
                                name="email"
                                label="Email Address"
                                placeholder="sheikh@example.com"
                                iconSrc={ICONS.email}
                            />

                            <CustomFormField
                                fieldType={FormFieldType.INPUT}
                                control={form.control}
                                name="username"
                                label="Username"
                                placeholder="Choose a username"
                                iconSrc={ICONS.user}
                            />

                            {!isEdit && (
                                <CustomFormField
                                    fieldType={FormFieldType.PASSWORD}
                                    control={form.control}
                                    name="password"
                                    label="Password"
                                    placeholder="Create a password"
                                    iconSrc={ICONS.lock}
                                />
                            )}

                            <CustomFormField
                                fieldType={FormFieldType.INPUT}
                                control={form.control}
                                name="phone"
                                label="Phone Number"
                                placeholder="+1234567890"
                                iconSrc={ICONS.phone}
                            />

                            {/* Country Field */}
                            <CustomFormField
                                fieldType={FormFieldType.SELECT}
                                control={form.control}
                                name="country_id"
                                label="Country"
                                placeholder="Select country"
                                options={countriesData}
                            />

                            {/* City Field */}
                            <CustomFormField
                                fieldType={FormFieldType.SELECT}
                                control={form.control}
                                name="city_id"
                                label="City"
                                placeholder="Select city"
                                options={citiesData}
                                disabled={!watchCountryId}
                            />
                        </div>
                        
                        {/* Image Upload */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 mb-2">
                                <ImageIcon className="w-4 h-4 text-primary-color1" />
                                <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                    Profile Image
                                </label>
                            </div>
                            <CustomUpload
                                onFileSelect={handleImageFileSelect}
                                acceptedFileTypes="image/*"
                                maxFileSize={5}
                                previewUrl={imagePreview}
                                label="Upload profile image"
                                description="PNG, JPG, GIF up to 5MB"
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
                        {/* Experience */}
                        <CustomFormField
                            fieldType={FormFieldType.TEXTAREA}
                            control={form.control}
                            name="experience"
                            label="Experience"
                            placeholder="e.g., 15 years of Islamic studies teaching, graduated from Al-Azhar University..."
                        />

                        {/* Specialization as TEXTAREA (String) */}
                        <CustomFormField
                            fieldType={FormFieldType.TEXTAREA}
                            control={form.control}
                            name="specialization"
                            label="Specialization"
                            placeholder="e.g., Tafseer, Hadith, Fiqh, Islamic Law, Quranic Studies..."
                        />

                        {/* Languages using TAG_INPUT (array) */}
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
                        />
                    </CardContent>
                </Card>

                {/* Form Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                        disabled={isLoading}
                        className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        Cancel
                    </Button>

                    <SubmitButton
                        isLoading={isLoading}
                        loadingText={isEdit ? "Updating..." : "Creating..."}
                        icon={isEdit ? Edit : Plus}
                    >
                        {isEdit ? "Update Sheikh" : "Add Sheikh"}
                    </SubmitButton>
                </div>
            </form>
        </Form>
    );
}