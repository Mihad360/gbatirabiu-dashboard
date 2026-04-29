// redux/features/baseApi.ts
import { axiosBaseQuery } from "@/lib/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL || "" }),
  tagTypes: [
    "Auth",
    "Dashboard", // ← add
    "Order", // ← add
    "Review", // ← add
    "Client", // ← add
    "Content", // ← add
    "Service",
    "ProductItem",
    "Offer",
  ],
  endpoints: () => ({}),
});
