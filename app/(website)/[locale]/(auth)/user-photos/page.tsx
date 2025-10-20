"use client";
import React from "react";
import UserPhotoForm from "@/components/user/forms/UserPhotoForm";
import AuthLayout from "@/components/user/layouts/AuthLayout";

const SelectUserPhoto = () => {
  return (
    <AuthLayout
      title="Welcome Aboard!"
      description="Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur."
      showLanguageSwitch={false}
      customFormClasses=" max-h-screen overflow-auto pb-12"
    >
      <UserPhotoForm />
    </AuthLayout>
  );
};

export default SelectUserPhoto;
