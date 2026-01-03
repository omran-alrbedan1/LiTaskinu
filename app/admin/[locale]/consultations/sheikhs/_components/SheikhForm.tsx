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
import { Plus, Edit, User, Image as ImageIcon, BookOpen, FileText } from "lucide-react";
import { ICONS } from "@/constants/icons";
import { SheikhFormValidation } from "@/validation/admin";
import CustomUpload from "@/components/shared/CustomUpload";

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

    const form = useForm<z.infer<typeof SheikhFormValidation>>({
        resolver: zodResolver(SheikhFormValidation),
        defaultValues: {
            name: "",
            email: "",
            username: "",
            password: "",
            phone: "",
            image: "",
            experience: "",
            specialization: [],
            languages: [],
            bio: "",
        },
    });

    // Set form values when editing
    useEffect(() => {
        if (initialData && isEdit) {
            form.reset({
                name: initialData.name || "",
                email: initialData.email || "",
                username: initialData.username || "",
                phone: initialData.phone || "",
                image: initialData.image || "",
                experience: initialData.experience || "",
                specialization: initialData.specialization || [],
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
        const formData = new FormData();
        
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("username", values.username);
        formData.append("phone", values.phone || "");
        formData.append("experience", values.experience);
        formData.append("bio", values.bio);
        
        formData.append("specialization", JSON.stringify(values.specialization));
        formData.append("languages", JSON.stringify(values.languages));
        
        if (!isEdit && values.password) {
            formData.append("password", values.password);
        }
        
        if (imageFile) {
            formData.append("image", imageFile);
        } else if (values.image && isEdit) {
            const imagePath = values.image.includes("/") 
                ? values.image.split("/").pop()! 
                : values.image;
            formData.append("image", imagePath);
        }
        
        if (isEdit && initialData?.id) {
            formData.append("id", initialData.id.toString());
        }
        
        const sheikhData = {
            id: initialData?.id || 0,
            name: values.name,
            email: values.email,
            username: values.username,
            password: isEdit ? undefined : values.password,
            phone: values.phone,
            image: values.image || "/placeholder-avatar.jpg",
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
                                name="name"
                                label="Full Name"
                                placeholder="Enter full name"
                                iconSrc={ICONS.user}
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

                        {/* Specialization using TAG_INPUT */}
                        <CustomFormField
                            fieldType={FormFieldType.TAG_INPUT}
                            control={form.control}
                            name="specialization"
                            label="Specialization"
                            tagInputProps={{
                                placeholder: "Add specialization ",
                                addButtonText: "Add Specialization",
                                maxTags: 10,
                                allowDuplicates: false,
                                separator: ",",
                            }}
                        />

                        {/* Languages using TAG_INPUT */}
                        <CustomFormField
                            fieldType={FormFieldType.TAG_INPUT}
                            control={form.control}
                            name="languages"
                            label="Languages"
                            tagInputProps={{
                                placeholder: "Add language ",
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