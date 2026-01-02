"use client";
import React from "react";
import ForgotPasswordForm from "@/components/website/forms/ForgotPasswordForm";
import AuthLayout from "@/components/website/layouts/AuthLayout";

const ForgotPassword = () => {
  return (
    <AuthLayout
      title="Reset Your Password"
      description="Enter your email address and we'll send you a verification code to reset your password and secure your account."
      showLanguageSwitch={false}
      showSocialMedia={true}
      customFormClasses="-mt-32 md:-mt-0"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPassword;
