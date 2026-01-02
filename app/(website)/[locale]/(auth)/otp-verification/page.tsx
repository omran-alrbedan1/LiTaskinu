"use client";
import React from "react";
import OtpForm from "@/components/website/forms/OtpForm";
import AuthLayout from "@/components/website/layouts/AuthLayout";

const OtpVerification = () => {
  return (
    <AuthLayout
      title="Verify Your Account"
      description="Enter the verification code sent to your email to secure your account and complete the registration process."
      showLanguageSwitch={false}
      showSocialMedia={false}
      customFormClasses="-mt-32 md:-mt-0"
    >
      <OtpForm />
    </AuthLayout>
  );
};

export default OtpVerification;
