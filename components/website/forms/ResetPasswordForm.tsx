"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { useSearchParams } from "next/navigation";
import SubmitButton from "@/components/Buttons/SubmitButton";
import CustomFormField, {
  FormFieldType,
} from "@/components/shared/CustomInput";
import { ICONS } from "@/constants/icons";
import usePostData from "@/hooks/usePostData";
import { useResetPasswordValidation } from "@/validation";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const reset_token = searchParams.get("token");

  const t = useTranslations("auth");
  const ft = useTranslations("fields");
  const vt = useTranslations("validation");

  const ResetPasswordValidation = useResetPasswordValidation();

  const { postData, loading: isLoading } = usePostData(
    "/api/website/reset-password",
    {
      showNotifications: true,
      successMessage: t("password_reset_success"),
      errorMessage: t("password_reset_failed"),
      onSuccess: () => {
        router.push("./sign-in");
      },
    }
  );

  const form = useForm<z.infer<typeof ResetPasswordValidation>>({
    resolver: zodResolver(ResetPasswordValidation),
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ResetPasswordValidation>) => {
    if (!reset_token) {
      form.setError("root", {
        message: vt("reset_token_missing"),
      });
      return;
    }

    const requestData = {
      reset_token,
      password: values.password,
      password_confirmation: values.password_confirmation,
    };

    await postData(requestData);
  };

  return (
    <div className="w-full max-w-md md:mt-44 mx-auto p-6">
      <h2 className="text-2xl text-center font-bold text-white mb-6">
        {t("create_new_password")}
      </h2>

      <p className="text-gray-400 text-center mb-6">
        {t("new_password_desc")}
      </p>

      {!reset_token && (
        <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-4">
          <p className="text-red-400 text-sm">
            {t("invalid_reset_token")}
          </p>
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 text-white"
        >
          <CustomFormField
            fieldType={FormFieldType.PASSWORD}
            control={form.control}
            name="password"
            label={ft("new_password")}
            placeholder={ft("new_password_placeholder")}
            iconSrc={ICONS.lock}
            iconAlt="password"
          />

          <CustomFormField
            fieldType={FormFieldType.PASSWORD}
            control={form.control}
            name="password_confirmation"
            label={ft("confirm_password")}
            placeholder={ft("confirm_password_placeholder")}
            iconSrc={ICONS.lock}
            iconAlt="confirm password"
          />

          <SubmitButton isLoading={isLoading} className="w-full">
            {isLoading
              ? t("resetting_password")
              : t("reset_password")}
          </SubmitButton>
        </form>
      </Form>

      <div className="mt-4 text-center">
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

export default ResetPasswordForm;
