// app/signup/page.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import AuthLayout from "@/components/website/layouts/AuthLayout";
import RegisterForm from "./_components/RegisterForm";
import { useTranslations } from "next-intl";

const SignUpPage = () => {
  const t = useTranslations("auth");
  return (
    <AuthLayout
      title={t("register_title")}
      description={t("register_desc")}
      customFormClasses="max-h-screen md:!w-[600px] pt-28 overflow-auto sidebar-scrollbar"
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default SignUpPage;
