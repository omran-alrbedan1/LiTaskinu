"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Languages, Flag, Plus, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField, {
  FormFieldType,
} from "@/components/shared/CustomInput";
import SubmitButton from "@/components/Buttons/SubmitButton";
import { useEffect } from "react";
import { CountryFormValidation } from "@/validation/admin";

interface CountryFormProps {
  onSubmit: (data: Country) => void;
  onCancel: () => void;
  isLoading?: boolean;
  initialData?: Country | null;
  isEdit?: boolean;
}

export function CountryForm({
  onSubmit,
  onCancel,
  isLoading = false,
  initialData,
  isEdit = false,
}: CountryFormProps) {
  const form = useForm<z.infer<typeof CountryFormValidation>>({
    resolver: zodResolver(CountryFormValidation),
    defaultValues: {
      code: "",
      name: {
        en: "",
        ar: "",
        fr: "",
        es: "",
        ru: "",
      },
    },
  });

  // Set form values when editing
  useEffect(() => {
    if (initialData && isEdit) {
      form.reset({
        code: initialData.code || "",
        name: {
          en: initialData.name?.en || "",
          ar: initialData.name?.ar || "",
          fr: initialData.name?.fr || "",
          es: initialData.name?.es || "",
          ru: initialData.name?.ru || "",
        },
      });
    }
  }, [initialData, isEdit, form]);

  const handleSubmit = (values: z.infer<typeof CountryFormValidation>) => {
    onSubmit(values as Country);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {/* Basic Information Card */}
        <Card className="border-blue-100 bg-blue-50/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-md">
                <Flag className="w-3 h-3 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Basic Information
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Country Code */}
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="code"
                label="Country Code "
                required
                placeholder="e.g., US, UK, SA"
                inputClassName="w-full pl-8 font-mono text-xs uppercase tracking-wide h-9 border-gray-300 focus:border-blue-500"
              />

              {/* English Name */}
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="name.en"
                label="English Name "
                required
                placeholder="Enter country name in English"
                inputClassName="w-full border-gray-300 focus:border-blue-500 h-9 text-sm"
              />
            </div>
          </CardContent>
        </Card>

        {/* Multilingual Names Card */}
        <Card className="border-purple-100 bg-purple-50/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center justify-center w-6 h-6 bg-purple-100 rounded-md">
                <Languages className="w-3 h-3 text-purple-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Multilingual Names
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Arabic Name */}
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="name.ar"
                label="Arabic Name "
                required
                placeholder="اسم الدولة"
                inputClassName="w-full text-right font-arabic text-sm border-gray-300 focus:border-blue-500 h-9"
              />

              {/* French Name */}
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="name.fr"
                label="French Name"
                placeholder="Nom du pays en français"
                inputClassName="w-full border-gray-300 focus:border-blue-500 h-9 text-sm"
              />

              {/* Spanish Name */}
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="name.es"
                label="Spanish Name"
                placeholder="Nombre del país en español"
                inputClassName="w-full border-gray-300 focus:border-blue-500 h-9 text-sm"
              />

              {/* Russian Name */}
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="name.ru"
                label="Russian Name"
                placeholder="Название страны на русском"
                inputClassName="w-full font-cyrillic border-gray-300 focus:border-blue-500 h-9 text-sm"
              />
            </div>
          </CardContent>
        </Card>

        {/* Form Actions */}
        <div className="flex justify-end w-fit ml-auto gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            className="min-w-20 h-9 text-sm border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Button>

          <SubmitButton
            isLoading={isLoading}
            loadingText={isEdit ? "Updating..." : "Adding..."}
            icon={isEdit ? Save : Plus}
          >
            {isEdit ? "Update Country" : "Add Country"}
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
}
