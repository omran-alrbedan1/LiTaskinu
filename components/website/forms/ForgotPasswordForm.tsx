"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import SubmitButton from "@/components/Buttons/SubmitButton";
import CustomFormField, {
  FormFieldType,
} from "@/components/shared/CustomInput";
import { ICONS } from "@/constants/icons";
import usePostData from "@/hooks/usePostData";
import { useForgotPasswordValidation } from "@/validation";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";

const ForgotPasswordForm = () => {
  const router = useRouter();
  const t = useTranslations("auth");
  const ft = useTranslations("fields");

  const ForgotPasswordValidation = useForgotPasswordValidation();

  const {
    postData,
    loading: isLoading,
    error,
    success,
  } = usePostData("/api/website/forgot-password", {
    showNotifications: true,
    successMessage: t("reset_code_sent"),
    errorMessage: t("reset_code_failed"),
    onSuccess: () => {
      router.push(
        `./verify-reset-code?email=${encodeURIComponent(
          form.getValues("email")
        )}`
      );
    },
  });

  const form = useForm<z.infer<typeof ForgotPasswordValidation>>({
    resolver: zodResolver(ForgotPasswordValidation),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: z.infer<typeof ForgotPasswordValidation>) => {
    await postData(values);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 text-white">
      <h2 className="text-2xl text-center font-bold mb-6">
        {t("reset_password_title")}
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="email"
            label={ft("email")}
            placeholder={ft("email_placeholder")}
            iconSrc={ICONS.email}
            iconAlt="email"
          />

          <SubmitButton isLoading={isLoading} className="w-full">
            {isLoading ? t("sending_code") : t("send_reset_code")}
          </SubmitButton>
        </form>
      </Form>

      <div className="mt-6 text-center">
        <Link
          href="./sign-in"
          className="text-primary-color2 hover:text-primary-color1 transition-colors"
        >
          {t("back_to_sign_in")}
        </Link>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
