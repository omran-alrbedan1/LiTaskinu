// app/login/page.tsx
"use client";
import LoginForm from "@/components/user/forms/loginForm";
import AuthLayout from "@/components/user/layouts/AuthLayout";
import React from "react";

const LoginPage = () => {
  return (
    <AuthLayout
      title="Welcome Aboard!"
      description="Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur."
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default LoginPage;
