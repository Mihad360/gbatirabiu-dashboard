/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import GbForm from "@/forms/GBForm";
import GbInput from "@/forms/GBInput";
import { useLoginUserMutation } from "@/redux/api/authApi";
import { setCookie } from "cookies-next";

const LoginPage = () => {
  const router = useRouter();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await loginUser(data).unwrap();
      setCookie("accessToken", res.data.accessToken, {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
      toast.success("Login successful", {
        position: "top-right",
        duration: 3000,
      });
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err?.data?.message || "Login failed", {
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
            alt="Login"
            fill
            className="object-contain p-8"
          />
        </div>

        <div className="w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>

          <GbForm onSubmit={onSubmit}>
            <GbInput
              name="phone"
              label="Phone"
              placeholder="Enter your phone"
            />
            <GbInput
              name="password"
              label="Password"
              type="password"
              placeholder="Enter your password"
            />

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary-dark text-white py-2.5 rounded-lg font-medium transition mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? "Logging in..." : "Log In"}
            </button>
          </GbForm>

          <p className="text-sm text-center mt-4 text-gray-500">
            <Link
              href="/forget-password"
              className="text-primary hover:underline"
            >
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
