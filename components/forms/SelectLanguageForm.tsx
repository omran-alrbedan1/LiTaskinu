"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { useState } from "react";

import { useRouter } from "next/navigation";
import SubmitButton from "../Buttons/SubmitButton";
import CustomFormField from "../shared/CustomInput";
import { FormFieldType } from "@/enums";
import { ICONS } from "@/constants/icons";
import Image from "next/image";
import { images } from "@/constants/images";
import { languageOptions } from "@/constants";

const SelectLanguageFormValidation = z.object({
  language: z.string().min(1, "Please select a language"),
});

const SelectLanguageForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof SelectLanguageFormValidation>>({
    resolver: zodResolver(SelectLanguageFormValidation),
    defaultValues: {
      language: "",
    },
  });

  async function onSubmit({
    language,
  }: z.infer<typeof SelectLanguageFormValidation>) {
    setIsLoading(true);
    try {
      console.log("Selected language:", language);
      // Save language preference and navigate to next page
      // router.push("./next-page");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="text-center mb-6">
        <Image
          src={images.logo}
          width={120}
          height={120}
          alt="logo"
          className="mx-auto mb-4 lg:hidden"
        />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Choose the language
        </h2>
        <p className="text-sm text-gray-600">
          Don't worry! It happens. Please select your preferred language.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <CustomFormField
            fieldType={FormFieldType.COMBOBOX}
            control={form.control}
            name="language"
            label="Language"
            placeholder="Select your language"
            searchPlaceholder="Search languages..."
            options={languageOptions}
          />

          <SubmitButton isLoading={isLoading} className="w-full">
            Continue
          </SubmitButton>
        </form>
      </Form>
    </div>
  );
};

export default SelectLanguageForm;
