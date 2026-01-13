// app/signup/page.tsx
import React from "react";
import AuthLayout from "@/components/website/layouts/AuthLayout";
import RegisterForm from "./_components/RegisterForm";

const SignUpPage = () => {
  return (
    <AuthLayout
      title="register_title"
      description="register_desc"
      customFormClasses="max-h-screen md:!w-[600px] pt-28 overflow-auto sidebar-scrollbar"
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default SignUpPage;
