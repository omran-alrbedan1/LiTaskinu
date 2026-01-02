import AuthLayout from "@/components/website/layouts/AuthLayout";
import React from "react";
import LoginForm from "./_components/LoginForm";

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
