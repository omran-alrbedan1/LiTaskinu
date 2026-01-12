"use client";
import VerifiyResetCodeForm from "@/components/website/forms/VerifiyResetCodeForm";
import AuthLayout from "@/components/website/layouts/AuthLayout";
import { useTranslations } from "next-intl";

const VerifyResetCode = () => {
  const t = useTranslations("auth");

  return (
    <AuthLayout
      title={t("verify_title")}
      description={t("verify_reset_code_desc")}
      showLanguageSwitch={false}
      customFormClasses="-mt-24 "
    >
      {/* Verify Reset Code Form */}
      <VerifiyResetCodeForm />
    </AuthLayout>
  );
};

export default VerifyResetCode;
