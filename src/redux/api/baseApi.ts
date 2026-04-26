// redux/features/baseApi.ts
import { axiosBaseQuery } from "@/lib/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL || "" }),
  tagTypes: [
    "Auth",
    "Order",
    "Service",
    "ProductItem",
    "Offer",
    "Client",
    "Content",
    "Review",
  ],
  endpoints: () => ({}),
});
