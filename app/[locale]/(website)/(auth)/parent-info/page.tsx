"use client";
import React from "react";
import ParentRegisterForm from "@/components/website/forms/ParentRegisterForm";
import AuthLayout from "@/components/website/layouts/AuthLayout";
import { useTranslations } from "next-intl";

const ParentInfo = () => {
  const t = useTranslations("auth");
  return (
    <AuthLayout
      title={t("parent_title")}
      description={t("parent_subtitle")}
      showLanguageSwitch={false}
      showSocialMedia={false}
      customFormClasses="pb-44"
    >
      <ParentRegisterForm />
    </AuthLayout>
  );
};

export default ParentInfo;
