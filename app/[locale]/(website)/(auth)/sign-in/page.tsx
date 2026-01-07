import AuthLayout from "@/components/website/layouts/AuthLayout";
import React from "react";
import LoginForm from "./_components/LoginForm";
import { getTranslations } from "next-intl/server";

const LoginPage = async () => {
  const t = await getTranslations("auth");
  return (
    <AuthLayout
      title={t("welcome_aboard")}
      description="Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur."
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
