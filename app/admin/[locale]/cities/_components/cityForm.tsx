"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Languages, MapPin, Plus, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import CustomFormField, {
  FormFieldType,
} from "@/components/shared/CustomInput";
import SubmitButton from "@/components/Buttons/SubmitButton";
import { useEffect, useState } from "react";
import { CityFormValidation } from "@/validation/admin";

interface CityFormProps {
  onSubmit: (data: City) => void;
  onCancel: () => void;
  isLoading?: boolean;
  initialData?: City | null;
  isEdit?: boolean;
  countries: Country[];
  isFetchingCountries?: boolean;
}

export function CityForm({
  onSubmit,
  onCancel,
  isLoading = false,
  initialData,
  isEdit = false,
  countries = [],
  isFetchingCountries = false,
}: CityFormProps) {
  const [debugInfo, setDebugInfo] = useState<string>("");
  const [isFormReady, setIsFormReady] = useState(false);

  const form = useForm<z.infer<typeof CityFormValidation>>({
    resolver: zodResolver(CityFormValidation),
    defaultValues: {
      country_id: "",
      name: {
        en: "",
        ar: "",
        fr: "",
        es: "",
        ru: "",
      },
    },
  });

  // Fix: Use a more reliable way to reset the form
  useEffect(() => {
    if (initialData && isEdit && countries.length > 0) {
      // Ensure country_id is properly converted to string
      const countryIdString = initialData.country_id
        ? initialData.country_id.toString()
        : "";

      setTimeout(() => {
        form.reset({
          country_id: countryIdString,
          name: {
            en: initialData.name?.en || "",
            ar: initialData.name?.ar || "",
            fr: initialData.name?.fr || "",
            es: initialData.name?.es || "",
            ru: initialData.name?.ru || "",
          },
        });

        const currentValues = form.getValues();

        const selectedCountry = countries.find(
          (country) => country.id.toString() === currentValues.country_id
        );

        setIsFormReady(true);
      }, 100);
    } else {
      // Reset form when not in edit mode
      if (!isEdit) {
        form.reset({
          country_id: "",
          name: {
            en: "",
            ar: "",
            fr: "",
            es: "",
            ru: "",
          },
        });
      }
    }
  }, [initialData, isEdit, form, countries]);

  const handleSubmit = (values: z.infer<typeof CityFormValidation>) => {
    const processedData = {
      ...values,
      country_id: Number(values.country_id),
    };
    console.log("Submitting data:", processedData);
    onSubmit(processedData as City);
  };

  const countryOptions = countries.map((country) => ({
    value: country.id.toString(),
    label: `${country.name.en}`,
    code: country.code,
  }));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        {/* Basic Information Card */}
        <Card className="border-blue-100 bg-blue-50/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center justify-center w-6 h-6 bg-blue-100 rounded-md">
                <MapPin className="w-3 h-3 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Basic Information
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Country Selection - Try COMBOBOX instead */}
              <CustomFormField
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="country_id"
                label="Country *"
                placeholder="Select a country"
                options={countryOptions}
                searchPlaceholder="Search countries..."
                inputClassName="w-full border-gray-300 focus:border-blue-500 h-9 text-sm"
              />

              {/* English Name */}
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="name.en"
                label="English Name *"
                placeholder="Enter city name in English"
                inputClassName="w-full border-gray-300 focus:border-blue-500 h-9 text-sm"
              />
            </div>
          </CardContent>
        </Card>

        {/* Rest of your form */}
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
                label="Arabic Name *"
                placeholder="اسم المدينة"
                inputClassName="w-full text-right font-arabic text-sm border-gray-300 focus:border-blue-500 h-9"
              />

              {/* French Name */}
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="name.fr"
                label="French Name"
                placeholder="Nom de la ville en français"
                inputClassName="w-full border-gray-300 focus:border-blue-500 h-9 text-sm"
              />

              {/* Spanish Name */}
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="name.es"
                label="Spanish Name"
                placeholder="Nombre de la ciudad en español"
                inputClassName="w-full border-gray-300 focus:border-blue-500 h-9 text-sm"
              />

              {/* Russian Name */}
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="name.ru"
                label="Russian Name"
                placeholder="Название города на русском"
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
            {isEdit ? "Update City" : "Add City"}
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
}
