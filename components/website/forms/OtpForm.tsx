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
import { useTranslations } from "next-intl";

const OtpForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const t = useTranslations("auth");
  const vt = useTranslations("validation");

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(20);
  const [canResend, setCanResend] = useState(false);

  const {
    postData: verifyOtp,
    loading: isVerifying,
    error: verifyError,
  } = usePostData("/api/website/verify-email", {
    showNotifications: true,
    successMessage: t("email_verified_success"),
    errorMessage: t("verification_failed"),
    onSuccess: () => {
      router.push("./home");
    },
  });

  const { postData: resendOtp, loading: isResending } = usePostData(
    "/api/website/resend-otp",
    {
      showNotifications: true,
      successMessage: t("resend_code_success"),
      errorMessage: t("resend_code_failed"),
    }
  );

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
      setError(vt("email_required"));
      return;
    }

    if (otp.length !== 6) {
      setError(vt("otp_incomplete"));
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
            {t("enter_verification_code")}
          </h1>
          <p className="text-gray-400 text-sm">
            {t("verification_code_sent")}{" "}
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

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {verifyError && (
            <p className="text-red-500 text-sm text-center">{verifyError}</p>
          )}

          <SubmitButton
            isLoading={isVerifying}
            loadingText={t("verifying")}
            className="w-full"
          >
            {t("verify")}
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
            {isResending ? t("sending") : t("send_code_again")}{" "}
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
