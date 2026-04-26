/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import GbForm from "@/forms/GBForm";
import GbInput from "@/forms/GBInput";
import { useForgetPassordMutation } from "@/redux/api/authApi";

const ForgetPasswordPage = () => {
  const router = useRouter();
  const [forgetPassword, { isLoading }] = useForgetPassordMutation();

  const onSubmit = async (data: FieldValues) => {
    try {
      await forgetPassword(data).unwrap();
      sessionStorage.setItem("resetPhone", data.phone);
      toast.success("OTP sent to your phone", {
        position: "top-right",
        duration: 3000,
      });
      router.push("/verify-otp");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to send OTP", {
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
            alt="Forget Password"
            fill
            className="object-contain p-8"
          />
        </div>

        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Forget Password
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            Enter your phone number to receive an OTP
          </p>

          <GbForm onSubmit={onSubmit}>
            <GbInput
              name="phone"
              label="Phone"
              placeholder="Enter your phone"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary-dark text-white py-2.5 rounded-lg font-medium transition mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? "Sending..." : "Send OTP"}
            </button>
          </GbForm>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;
