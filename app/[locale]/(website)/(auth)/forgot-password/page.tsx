"use client";
import React from "react";
import ForgotPasswordForm from "@/components/website/forms/ForgotPasswordForm";
import AuthLayout from "@/components/website/layouts/AuthLayout";
import { useTranslations } from "next-intl";

const ForgotPassword = () => {
  const t = useTranslations("auth");
  return (
    <AuthLayout
      title={t("reset_password_title")}
      description={t("forgot_desc")}
      showLanguageSwitch={false}
      showSocialMedia={true}
      customFormClasses="-mt-32 md:-mt-0"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPassword;
