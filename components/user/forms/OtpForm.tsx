import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import SubmitButton from "../../Buttons/SubmitButton";

const OtpForm = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(20);
  const [canResend, setCanResend] = useState(false);

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const validateOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate API call delay
    setTimeout(() => {
      if (otp === "12345") {
        console.log("OTP verified successfully!");
        router.push("./user-photos");
      } else {
        setError("Invalid code. Please try again.");
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleOtpChange = (value: string) => {
    setOtp(value);
    if (error) setError("");
  };

  const handleResendCode = () => {
    if (canResend) {
      setCountdown(20);
      setCanResend(false);
      setOtp("");
      setError("");
      console.log("New code sent!");
    }
  };

  return (
    <div className="flex flex-col max-w-lg mx-auto items-center  justify-center min-h-screen  p-4">
      <div className="w-full  p-8  rounded-xl  ">
        <div className=" mb-8 text-center">
          <h1 className="text-3xl font-bold  text-white mb-2">Enter code</h1>
          <p className="text-gray-400 text-sm">
            We've sent an SMS with an activation code to your phone{" "}
            <span className="font-medium">+33 2 94 27 84 11</span>
          </p>
        </div>

        <form className="space-y-6" onSubmit={validateOtp}>
          <div className="flex justify-center">
            <InputOTP
              maxLength={5}
              value={otp}
              onChange={handleOtpChange}
              disabled={isLoading}
            >
              <InputOTPGroup className="gap-2">
                <InputOTPSlot
                  index={0}
                  className="w-14 h-14 text-lg border-2 rounded-lg border-primary-color1"
                />
                <InputOTPSlot
                  index={1}
                  className="w-14 h-14 text-lg border-2 rounded-lg border-primary-color1"
                />
                <InputOTPSlot
                  index={2}
                  className="w-14 h-14 text-lg border-2 rounded-lg border-primary-color1"
                />
                <InputOTPSlot
                  index={3}
                  className="w-14 h-14 text-lg border-2 border-primary-color1 rounded-lg"
                />
                <InputOTPSlot
                  index={4}
                  className="w-14 h-14 text-lg border-2 border-primary-color1 rounded-lg"
                />
              </InputOTPGroup>
            </InputOTP>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <SubmitButton
            isLoading={isLoading}
            loadingText="Verifying.."
            className="w-full"
          >
            Verify
          </SubmitButton>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={handleResendCode}
            disabled={!canResend}
            className={`text-sm ${
              canResend ? "text-primary-color2" : "text-gray-400"
            }`}
          >
            Send code again{" "}
            {!canResend && (
              <span className=" text-primary-color1 font-bold">
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
