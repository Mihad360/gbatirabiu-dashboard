"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { setCookie } from "cookies-next";
import { useVerifyOtpMutation } from "@/redux/api/authApi";

const VerifyOtpPage = () => {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) inputs.current[index + 1]?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const otpValue = otp.join("");

    if (otpValue.length < 6) {
      toast.error("Please enter the complete 6-digit OTP", {
        position: "top-right",
        duration: 3000,
      });
      return;
    }

    const phone = sessionStorage.getItem("resetPhone");
    if (!phone) {
      toast.error("Session expired. Please try again.", {
        position: "top-right",
        duration: 4000,
      });
      router.push("/forget-password");
      return;
    }

    try {
      const res = await verifyOtp({ phone, otp: otpValue }).unwrap();
      // store temp token in cookie for reset-password
      setCookie("resetToken", res.data.accessToken, {
        maxAge: 60 * 3, // 3 minutes — matches OTP expiry
        path: "/",
      });
      toast.success("OTP verified successfully", {
        position: "top-right",
        duration: 3000,
      });
      router.push("/reset-password");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err?.data?.message || "Invalid or expired OTP", {
        position: "top-right",
        duration: 4000,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-2xl shadow-md flex w-[850px] overflow-hidden">
        <div className="w-1/2 bg-primary/10 flex items-center justify-center p-10 relative min-h-[400px]">
          <Image
            src="/auth-illustration.png"
            alt="Verify OTP"
            fill
            className="object-contain p-8"
          />
        </div>

        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Verify Email
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            Enter the 6-digit OTP sent to your phone
          </p>

          <div className="flex gap-3 justify-center mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-200 rounded-lg focus:border-primary focus:outline-none transition"
              />
            ))}
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-primary hover:bg-primary-dark text-white py-2.5 rounded-lg font-medium transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isLoading ? "Verifying..." : "Verify OTP"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
