"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SubmitButton from "@/components/Buttons/SubmitButton";
import Image from "next/image";
import { images } from "@/constants/images";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

// Validation schema for reset code verification
const VerifyResetCodeValidation = z.object({
  code: z.string().length(6, "Reset code must be exactly 6 characters"),
});

type VerifyResetCodeFormValues = z.infer<typeof VerifyResetCodeValidation>;

const VerifyResetCodeForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const router = useRouter();

  const form = useForm<VerifyResetCodeFormValues>({
    resolver: zodResolver(VerifyResetCodeValidation),
    defaultValues: {
      code: "",
    },
  });

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  async function onSubmit({ code }: VerifyResetCodeFormValues) {
    setIsLoading(true);
    try {
      console.log("Verifying reset code:", code);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate successful verification
      if (code === "123456") {
        router.push("./reset-password");
      } else {
        form.setError("code", {
          type: "manual",
          message: "Invalid verification code. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      form.setError("code", {
        type: "manual",
        message: "Failed to verify code. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleResendCode = async () => {
    if (canResend) {
      setCountdown(30);
      setCanResend(false);
      form.setValue("code", "");
      form.clearErrors("code");
      console.log("Resending verification code...");
      await new Promise((resolve) => setTimeout(resolve, 1000));
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
                disabled={isLoading}
              >
                <InputOTPGroup className="gap-2">
                  <InputOTPSlot
                    index={0}
                    className="w-12 h-12 text-lg border-2 rounded-lg border-primary-color1"
                  />
                  <InputOTPSlot
                    index={1}
                    className="w-12 h-12 text-lg border-2 rounded-lg border-primary-color1"
                  />
                  <InputOTPSlot
                    index={2}
                    className="w-12 h-12 text-lg border-2 rounded-lg border-primary-color1"
                  />
                  <InputOTPSlot
                    index={3}
                    className="w-12 h-12 text-lg border-2 rounded-lg border-primary-color1"
                  />
                  <InputOTPSlot
                    index={4}
                    className="w-12 h-12 text-lg border-2 rounded-lg border-primary-color1"
                  />
                  <InputOTPSlot
                    index={5}
                    className="w-12 h-12 text-lg border-2 rounded-lg border-primary-color1"
                  />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {form.formState.errors.code && (
              <p className="text-sm text-red-600 text-center">
                {form.formState.errors.code.message}
              </p>
            )}
          </div>

          <SubmitButton
            isLoading={isLoading}
            loadingText="Verifying..."
            className="w-full"
          >
            Verify Code
          </SubmitButton>
        </form>
      </Form>

      <div className="mt-6 text-center space-y-4">
        <p className="text-sm text-gray-600">
          Didn't receive the code?{" "}
          <button
            onClick={handleResendCode}
            disabled={!canResend}
            className={`font-medium transition-colors ${
              canResend
                ? "text-primary hover:text-primary/90"
                : "text-gray-400 cursor-not-allowed"
            }`}
          >
            Resend Code{" "}
            {!canResend && (
              <span className="text-primary-color1 font-bold">
                ({String(Math.floor(countdown / 60)).padStart(2, "0")}:
                {String(countdown % 60).padStart(2, "0")})
              </span>
            )}
          </button>
        </p>

        <div className="pt-4 border-t border-gray-200">
          <Link
            href="./forgot-password"
            className="text-sm font-medium text-primary hover:text-primary/90 transition-colors"
          >
            ← Back to Forgot Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyResetCodeForm;
