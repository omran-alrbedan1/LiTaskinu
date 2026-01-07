"use client";
import React from "react";
import ResetPasswordForm from "@/components/website/forms/ResetPasswordForm";
import AuthLayout from "@/components/website/layouts/AuthLayout";
import { useTranslations } from "next-intl";

const ResetPassword = () => {
  const t = useTranslations("auth");
  return (
    <AuthLayout
      title={t("reset_password_title")}
      description={t("reset_desc")}
      showLanguageSwitch={false}
      customFormClasses="max-h-screen overflow-auto -mt-28"
    >
      <ResetPasswordForm />
    </AuthLayout>
  );
};

export default ResetPassword;
