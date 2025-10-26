"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import SubmitButton from "@/components/Buttons/SubmitButton";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import usePostData from "@/hooks/usePostData";

// Validation schema for reset code verification
const VerifyResetCodeValidation = z.object({
  code: z.string().length(6, "Reset code must be exactly 6 characters"),
  email: z.string(),
});

type VerifyResetCodeFormValues = z.infer<typeof VerifyResetCodeValidation>;

const VerifyResetCodeForm = () => {
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  // OTP Verification Hook
  const {
    postData: verifyOtp,
    loading: isVerifying,
    error: verifyError,
  } = usePostData("/api/website/verify-otp", {
    showNotifications: true,
    successMessage: "Code verified successfully!",
    errorMessage: "Invalid verification code.",
    onSuccess: (data) => {
      const resetToken = data.reset_token;
      if (resetToken) {
        router.push(`./reset-password?token=${encodeURIComponent(resetToken)}`);
      } else {
        console.error("No reset token received from API");
      }
    },
  });

  // Resend OTP Hook
  const { postData: resendOtp, loading: isResending } = usePostData(
    "/api/website/forgot-password",
    {
      showNotifications: true,
      successMessage: "New code sent to your email!",
      errorMessage: "Failed to resend code.",
    }
  );

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const form = useForm<VerifyResetCodeFormValues>({
    resolver: zodResolver(VerifyResetCodeValidation),
    defaultValues: {
      email: "",
      code: "",
    },
  });

  async function onSubmit({ code }: VerifyResetCodeFormValues) {
    if (!email) {
      form.setError("code", {
        type: "manual",
        message: "Email is required. Please go back and try again.",
      });
      return;
    }

    await verifyOtp({
      email: email,
      otp: code,
    });
  }

  const handleResendCode = async () => {
    if (canResend && email) {
      await resendOtp({ email });
      setCountdown(30);
      setCanResend(false);
      form.setValue("code", "");
      form.clearErrors("code");
    }
  };

  const handleOtpChange = (value: string) => {
    form.setValue("code", value);
    if (form.formState.errors.code) {
      form.clearErrors("code");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 rounded-lg shadow-sm">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          Enter Verification Code
        </h2>
        <p className="text-gray-400 text-sm">
          We sent a 6-digit code to your email
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-400">
              Verification Code
            </label>
            <div className="flex justify-center text-white">
              <InputOTP
                maxLength={6}
                value={form.watch("code")}
                onChange={handleOtpChange}
                disabled={isVerifying}
              >
                <InputOTPGroup className="gap-2">
                  {[...Array(6)].map((_, index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      className="w-12 h-12 text-lg border-2 rounded-lg border-primary-color1"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>

            {form.formState.errors.code && (
              <p className="text-sm text-red-500 text-center">
                {form.formState.errors.code.message}
              </p>
            )}
            {verifyError && (
              <p className="text-sm text-red-500 text-center">{verifyError}</p>
            )}
          </div>

          <SubmitButton
            isLoading={isVerifying}
            loadingText="Verifying..."
            className="w-full"
          >
            Verify Code
          </SubmitButton>
        </form>
      </Form>

      <div className="mt-6 text-center space-y-4">
        <p className="text-sm text-gray-400">
          Didn't receive the code?{" "}
          <button
            onClick={handleResendCode}
            disabled={!canResend || isResending}
            className={`font-medium transition-colors ${
              canResend && !isResending
                ? "text-primary-color2 hover:text-primary-color1"
                : "text-gray-500 cursor-not-allowed"
            }`}
          >
            {isResending ? "Sending..." : "Resend Code"}{" "}
            {!canResend && !isResending && (
              <span className="text-primary-color1 font-bold">
                ({String(Math.floor(countdown / 60)).padStart(2, "0")}:
                {String(countdown % 60).padStart(2, "0")})
              </span>
            )}
          </button>
        </p>

        <div className="pt-4 border-t border-gray-600">
          <Link
            href="./forgot-password"
            className="text-sm font-medium text-primary-color2 hover:text-primary-color1 transition-colors"
          >
            ← Back to Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyResetCodeForm;
