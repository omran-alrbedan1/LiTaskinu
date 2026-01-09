// app/select-user-type/page.tsx
"use client";
import React from "react";
import SelectUserTypeForm from "@/components/website/forms/SelectUserTypeForm";
import AuthLayout from "@/components/website/layouts/AuthLayout";

const SelectUserType = () => {
  return (
    <AuthLayout
      title="Welcome Aboard!"
      description="Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur."
      showLanguageSwitch={false}
    >
      <SelectUserTypeForm />
    </AuthLayout>
  );
};

export default SelectUserType;
