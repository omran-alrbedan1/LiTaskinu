import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import SubmitButton from "../../Buttons/SubmitButton";
import { useSearchParams } from "next/navigation";
import usePostData from "@/hooks/usePostData";

const OtpForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(20);
  const [canResend, setCanResend] = useState(false);

  // OTP Verification Hook
  const {
    postData: verifyOtp,
    loading: isVerifying,
    error: verifyError,
  } = usePostData("/api/website/verify-email", {
    showNotifications: true,
    successMessage: "Email verified successfully!",
    errorMessage: "Verification failed.",
    onSuccess: (data) => {
      console.log("OTP verified successfully!");
      router.push("./sign-in");
    },
  });

  // Resend OTP Hook
  const { postData: resendOtp, loading: isResending } = usePostData(
    "/api/website/resend-otp",
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

  const validateOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required");
      return;
    }

    if (otp.length !== 6) {
      setError("Please enter the complete 6-digit code");
      return;
    }

    await verifyOtp({ email, otp });
  };

  const handleOtpChange = (value: string) => {
    setOtp(value);
    if (error) setError("");
  };

  const handleResendCode = async () => {
    if (canResend && email) {
      await resendOtp({ email });
      setCountdown(20);
      setCanResend(false);
      setOtp("");
      setError("");
    }
  };

  return (
    <div className="flex flex-col max-w-lg mx-auto items-center justify-center min-h-screen p-4">
      <div className="w-full p-8 rounded-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            Enter verification code
          </h1>
          <p className="text-gray-400 text-sm">
            We've sent a verification code to your email{" "}
            <span className="font-medium text-primary-color1">{email}</span>
          </p>
        </div>

        <form className="space-y-6 text-white" onSubmit={validateOtp}>
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={handleOtpChange}
              disabled={isVerifying}
            >
              <InputOTPGroup className="gap-2">
                {[...Array(6)].map((_, index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className="w-14 h-14 text-lg border-2 rounded-lg border-primary-color1"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
          <SubmitButton
            isLoading={isVerifying}
            loadingText="Verifying..."
            className="w-full"
          >
            Verify
          </SubmitButton>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={handleResendCode}
            disabled={!canResend || isResending}
            className={`text-sm ${
              canResend
                ? "text-primary-color2 hover:text-primary-color1"
                : "text-gray-400"
            } transition-colors`}
          >
            {isResending ? "Sending..." : "Send code again"}{" "}
            {!canResend && !isResending && (
              <span className="text-primary-color1 font-bold">
                {String(Math.floor(countdown / 60)).padStart(2, "0")}:
                {String(countdown % 60).padStart(2, "0")}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpForm;
