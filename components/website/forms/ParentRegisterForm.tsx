"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form } from "@/components/ui/form";
import { useState } from "react";

import { useRouter } from "next/navigation";
import SubmitButton from "../../Buttons/SubmitButton";
import CustomFormField, { FormFieldType } from "../../shared/CustomInput";
import { ICONS } from "@/constants/icons";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useKinshipOptions } from "@/constants/options";
import { useTranslations } from "next-intl";

const ParentRegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const t = useTranslations("auth");
  const ft = useTranslations("fields");
  const vt = useTranslations("validation");

  const kinshipOptions = useKinshipOptions();

  const RegisterFormValidation = z.object({
    firstName: z.string().min(1, vt("first_name_required")),
    lastName: z.string().min(1, vt("last_name_required")),
    kinship: z.string().min(1, vt("kinship_required")),
    email: z.string().email(vt("invalid_email")),
    phone: z.string().min(1, vt("phone_required")),
  });

  const form = useForm<z.infer<typeof RegisterFormValidation>>({
    resolver: zodResolver(RegisterFormValidation),
    defaultValues: {
      firstName: "",
      lastName: "",
      kinship: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit(values: z.infer<typeof RegisterFormValidation>) {
    setIsLoading(true);
    try {
      console.log("Registration data:", values);
      router.push("./otp-verification");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    const credential = credentialResponse.credential;

    if (credential) {
      try {
        console.log("Google registration successful:", credential);
      } catch (error) {
        console.error("Google registration error:", error);
      }
    }
  };

  return (
    <div className="w-full overflow-y-scroll max-h-svh hide-scrollbar pb-20 md:p-6 md:pb-20 rounded-lg shadow-sm">
      <div className="text-center mb-4 hidden md:block">
        <h2 className="text:2xl md:text-3xl font-bold text-white">
          {t("parent_information")}
        </h2>
        <p className="mt-2 text-sm text-gray-300">
          {t("parent_information_desc")}
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 text-white"
        >
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="firstName"
                label={ft("first_name")}
                placeholder={ft("first_name_placeholder")}
                iconSrc={ICONS.userInput}
              />

              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="lastName"
                label={ft("last_name")}
                placeholder={ft("last_name_placeholder")}
                iconSrc={ICONS.userInput}
              />
            </div>

            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="kinship"
              label={ft("kinship")}
              placeholder={ft("kinship_placeholder")}
              options={kinshipOptions}
            />

            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="email"
              label={ft("email_address")}
              placeholder="loisbecket@gmail.com"
              iconSrc={ICONS.email}
              iconAlt="email"
            />

            <CustomFormField
              fieldType={FormFieldType.PHONE_INPUT}
              control={form.control}
              name="phone"
              label={ft("phone_number")}
            />

            <SubmitButton
              isLoading={isLoading}
              loadingText={t("submitting")}
              className="w-full"
              type="submit"
              onClick={() => console.log("Submit button clicked")}
            >
              {t("continue")}
            </SubmitButton>
          </>
        </form>
      </Form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-gray-900 text-gray-500 dark:text-gray-400">
            {t("or_continue_with")}
          </span>
        </div>
      </div>

      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        useOneTap
        text="signup_with"
        shape="rectangular"
        size="large"
        width={"100%"}
      />
    </div>
  );
};

export default ParentRegisterForm;
