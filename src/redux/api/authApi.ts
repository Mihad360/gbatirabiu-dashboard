import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["Auth"],
    }),
    signUpUser: build.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["Auth"],
    }),
    forgetPassord: build.mutation({
      query: (data) => ({
        url: "/auth/forget-password",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["Auth"],
    }),
    verifyOtp: build.mutation({
      query: (data) => ({
        url: "/auth/verify-otp",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["Auth"],
    }),
    resetPassword: build.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["Auth"],
    }),
    changePassword: build.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        contentType: "application/json",
        data,
      }),
      invalidatesTags: ["Auth"],
    }),
    resendOtp: build.mutation({
      query: (email) => ({
        url: `/auth/resend-otp/${email}`,
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useSignUpUserMutation,
  useForgetPassordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useResendOtpMutation,
} = authApi;
