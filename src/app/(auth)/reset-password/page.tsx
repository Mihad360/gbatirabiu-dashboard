/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { getCookie, deleteCookie } from "cookies-next";
import GbForm from "@/forms/GBForm";
import GbInput from "@/forms/GBInput";
import { useResetPasswordMutation } from "@/redux/api/authApi";

const ResetPasswordPage = () => {
  const router = useRouter();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onSubmit = async (data: FieldValues) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match", {
        position: "top-right",
        duration: 3000,
      });
      return;
    }

    if (data.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters", {
        position: "top-right",
        duration: 3000,
      });
      return;
    }

    const resetToken = getCookie("resetToken");
    if (!resetToken) {
      toast.error("Session expired. Please try again.", {
        position: "top-right",
        duration: 4000,
      });
      router.push("/forget-password");
      return;
    }

    try {
      await resetPassword({
        newPassword: data.newPassword,
        token: resetToken,
      }).unwrap();

      // clean up
      deleteCookie("resetToken");
      sessionStorage.removeItem("resetPhone");

      toast.success("Password reset successfully", {
        position: "top-right",
        duration: 3000,
      });
      router.push("/login");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to reset password", {
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
            alt="Reset Password"
            fill
            className="object-contain p-8"
          />
        </div>

        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Reset Password
          </h2>
          <p className="text-sm text-gray-500 mb-6">Enter your new password</p>

          <GbForm onSubmit={onSubmit}>
            <GbInput
              name="newPassword"
              label="New Password"
              type="password"
              placeholder="Enter new password"
            />
            <GbInput
              name="confirmPassword"
              label="Re-enter New Password"
              type="password"
              placeholder="Confirm new password"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary-dark text-white py-2.5 rounded-lg font-medium transition mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? "Resetting..." : "Reset Password"}
            </button>
          </GbForm>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
