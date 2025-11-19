"use client";
import React from "react";
import ParentRegisterForm from "@/components/user/forms/ParentRegisterForm";
import AuthLayout from "@/components/user/layouts/AuthLayout";

const ParentInfo = () => {
  return (
    <AuthLayout
      title="Complete Your Parent Profile"
      description="Please provide your information to complete the parent registration process and set up your family account."
      showLanguageSwitch={false}
      showSocialMedia={false}
      customFormClasses="pb-44"
    >
      <ParentRegisterForm />
    </AuthLayout>
  );
};

export default ParentInfo;
