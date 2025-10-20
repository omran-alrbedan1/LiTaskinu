"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { useState } from "react";

import { useRouter } from "next/navigation";
import SubmitButton from "../../Buttons/SubmitButton";
import CustomFormField, { FormFieldType } from "../../shared/CustomInput";
import Image from "next/image";
import { images } from "@/constants/images";
import { languageOptions } from "@/constants/options";

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
      router.push("./select-user-type");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full  mx-auto p-6  rounded-lg shadow-sm">
      {/* Header */}

      <h2 className="text-lg text-center sm:text-xl lg:text-2xl font-semibold text-white mb-2">
        Select Your Language
      </h2>
      <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-400">
        <span>Choose your preferred language</span>
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
