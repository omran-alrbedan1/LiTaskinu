"use client";
import React from "react";
import ResetPasswordForm from "@/components/user/forms/ResetPasswordForm";
import AuthLayout from "@/components/user/layouts/AuthLayout";

const ResetPassword = () => {
  return (
    <AuthLayout
      title="Reset Your Password"
      description="Create a new secure password for your account to regain access and protect your information."
      showLanguageSwitch={false}
      customFormClasses="max-h-screen overflow-auto -mt-28"
    >
      <ResetPasswordForm />
    </AuthLayout>
  );
};

export default ResetPassword;
