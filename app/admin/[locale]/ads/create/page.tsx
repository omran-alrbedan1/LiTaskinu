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
import { Header } from "@/components/admin/shared";
import {
  Save,
  Upload,
  Image as ImageIcon,
  FileText,
  Calendar,
  Settings,
  Info,
  Check,
} from "lucide-react";
import Link from "next/link";
import CustomFormField, {
  FormFieldType,
} from "@/components/shared/CustomInput";
import CustomUpload from "@/components/shared/CustomUpload";
import { BsAspectRatio } from "react-icons/bs";
import { useLocale } from "next-intl";
import { formatDate } from "@/utils/format";

// Validation schema
const AdFormValidation = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  status: z.string().min(1, "Status is required"),
  targetAudience: z.string().min(1, "Target audience is required"),
});

type AdFormValues = z.infer<typeof AdFormValidation>;

export default function CreateAdPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [imagePreview, setImagePreview] = React.useState<string>("");
  const locale = useLocale();

  const form = useForm<AdFormValues>({
    resolver: zodResolver(AdFormValidation),
    defaultValues: {
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      status: "active",
      targetAudience: "all",
    },
  });

  const handleImageSelect = (file: File | null) => {
    setImageFile(file);
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    } else {
      setImagePreview("");
    }
  };

  async function onSubmit(data: AdFormValues) {
    setIsLoading(true);
    try {
      const formData = new FormData();

      // Append form data
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Append image file if exists
      if (imageFile) {
        formData.append("image", imageFile);
      }

      console.log("Ad data:", data);
      console.log("Image file:", imageFile);

      // Here you would typically send to your API
      // await createAd(formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect or show success message
      // router.push('/admin/ads');
    } catch (error) {
      console.error("Error creating ad:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="max-h-[90vh] overflow-auto sidebar-scrollbar p-8">
      <div className="mx-auto space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Header
            title="Create New Advertisement"
            description="Add a new advertisement to reach your audience"
          />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#A1AA8A]/20 dark:bg-[#c77971]/20 rounded flex items-center justify-center">
                    <FileText className="w-4 h-4 text-primary-color1" />
                  </div>
                  Ad Information
                </CardTitle>
                <CardDescription>
                  Enter the basic details for your advertisement
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="title"
                    label="Ad Title"
                    placeholder="Enter a compelling ad title"
                    iconAlt="title"
                  />

                  <CustomFormField
                    fieldType={FormFieldType.TEXTAREA}
                    control={form.control}
                    name="description"
                    label="Description"
                    placeholder="Describe your advertisement in detail"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Schedule & Settings Card */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-[#A1AA8A]/20 dark:bg-[#c77971]/20  rounded flex items-center justify-center">
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
                    name="startDate"
                    label="Start Date"
                    placeholder={`${formatDate(new Date())}`}
                  />

                  <CustomFormField
                    fieldType={FormFieldType.DATE_PICKER}
                    control={form.control}
                    name="endDate"
                    label="End Date"
                    placeholder={`${formatDate(new Date())}`}
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
                        { value: "paused", label: "Paused" },
                        { value: "draft", label: "Draft" },
                      ]}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="targetAudience">Target Audience</Label>
                    <CustomFormField
                      fieldType={FormFieldType.SELECT}
                      control={form.control}
                      name="targetAudience"
                      placeholder="Select audience"
                      options={[
                        { value: "all", label: "All Users" },
                        { value: "premium", label: "Premium Members" },
                        { value: "new", label: "New Users" },
                        { value: "returning", label: "Returning Users" },
                      ]}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Media Upload Card */}
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
                  {/* Upload Area */}
                  <div className="space-y-4">
                    <CustomUpload
                      onFileSelect={handleImageSelect}
                      acceptedFileTypes="image/*"
                      maxFileSize={10}
                      previewUrl={imagePreview}
                      label="Drop your image here"
                      description="PNG, JPG, GIF up to 10MB"
                      required
                    />
                  </div>

                  {/* Preview & Guidelines */}
                  <div className="space-y-4">
                    <div className=" rounded-xl  p-5 border border-blue-100 dark:border-gray-700">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-[#A1AA8A]/20 dark:bg-[#c77971]/20  rounded-lg flex items-center justify-center">
                          <Info className="w-5 h-5 text-primary-color1 bg-[#" />
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

            {/* Actions Card */}
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <Link href={`/admin/${locale}/ads`}>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto"
                  type="button"
                >
                  Cancel
                </Button>
              </Link>
              <Button
                type="submit"
                disabled={isLoading}
                className="gap-2 w-full sm:w-auto bg-primary-color1 hover:bg-primary-color1/90 text-white"
              >
                <Save className="w-4 h-4" />
                {isLoading ? "Creating..." : "Create Advertisement"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
