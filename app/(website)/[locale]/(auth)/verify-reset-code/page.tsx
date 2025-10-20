"use client";
import VerifiyResetCodeForm from "@/components/user/forms/VerifiyResetCodeForm";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/user/layouts/AuthLayout";

const VerifyResetCode = () => {
  const router = useRouter();

  return (
    <AuthLayout
      title="Verify Your Account"
      description="Enter the verification code sent to your email to reset your password and secure your account. This helps us ensure the security of your personal information."
      showLanguageSwitch={false}
      customFormClasses="-mt-24 "
    >
      {/* Verify Reset Code Form */}
      <VerifiyResetCodeForm />
    </AuthLayout>
  );
};

export default VerifyResetCode;
