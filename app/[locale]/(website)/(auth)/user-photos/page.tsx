"use client";
import React from "react";
import UserPhotoForm from "@/components/website/forms/UserPhotoForm";
import AuthLayout from "@/components/website/layouts/AuthLayout";
import { useTranslations } from "next-intl";

const SelectUserPhoto = () => {
  const t = useTranslations("auth");
  return (
    <AuthLayout
      title={t("welcome_aboard")}
      description="Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur."
      showLanguageSwitch={false}
      customFormClasses=" max-h-screen overflow-auto pb-12"
    >
      <UserPhotoForm />
    </AuthLayout>
  );
};

export default SelectUserPhoto;
