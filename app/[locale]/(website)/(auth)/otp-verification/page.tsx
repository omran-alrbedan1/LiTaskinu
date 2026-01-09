"use client";
import React from "react";
import OtpForm from "@/components/website/forms/OtpForm";
import AuthLayout from "@/components/website/layouts/AuthLayout";
import { useTranslations } from "next-intl";

const OtpVerification = () => {
  const t = useTranslations("auth");
  return (
    <AuthLayout
      title={t("verify_title")}
      description={t("verify_subtitle")}
      showLanguageSwitch={false}
      showSocialMedia={false}
      customFormClasses="-mt-32 md:-mt-0"
    >
      <OtpForm />
    </AuthLayout>
  );
};

export default OtpVerification;
