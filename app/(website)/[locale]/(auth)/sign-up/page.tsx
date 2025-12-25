// app/signup/page.tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import AuthLayout from "@/components/user/layouts/AuthLayout";
import RegisterForm from "./_components/RegisterForm";

const SignUpPage = () => {
  return (
    <AuthLayout
      title="Join Our Community!"
      description="Create your account and start your journey with us. Lorem ipsum dolor sit amet consectetur adipisicing elit."
      customFormClasses="max-h-screen md:!w-[600px] pt-28 overflow-auto sidebar-scrollbar"
    >
      <RegisterForm />
    </AuthLayout>
  );
};

export default SignUpPage;
