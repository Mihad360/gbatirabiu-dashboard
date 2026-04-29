import { baseApi } from "./baseApi";

// ── helper — builds URLSearchParams from any object ──────────
const buildParams = (args?: Record<string, unknown>) => {
  const params = new URLSearchParams();
  if (args && typeof args === "object") {
    Object.entries(args).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, String(value));
      }
    });
  }
  return params;
};

const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // ── DASHBOARD ───────────────────────────────────────────
    getDashboardStats: build.query({
      query: () => ({
        url: "/admin/dashboard/stats",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),
    getRecentActivity: build.query({
      query: () => ({
        url: "/admin/dashboard/recent-activity",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),

    // ── ORDERS ──────────────────────────────────────────────
    getAllOrders: build.query({
      query: (args?: Record<string, unknown>) => ({
        url: "/admin/orders",
        method: "GET",
        params: buildParams(args),
      }),
      transformResponse: (response) => ({
        data: response.data,
        meta: response.meta,
      }),
      providesTags: ["Order"],
    }),
    getSingleOrder: build.query({
      query: (id: string) => ({
        url: `/admin/orders/${id}`,
        method: "GET",
      }),
      providesTags: ["Order"],
    }),
    changeOrderStatus: build.mutation({
      query: ({ id, status }: { id: string; status: string }) => ({
        url: `/admin/orders/${id}/status`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: ["Order", "Dashboard"],
    }),
    deleteOrder: build.mutation({
      query: (id: string) => ({
        url: `/admin/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order", "Dashboard"],
    }),

    // ── REVIEWS ─────────────────────────────────────────────
    getAllReviews: build.query({
      query: (args?: Record<string, unknown>) => ({
        url: "/admin/reviews",
        method: "GET",
        params: buildParams(args),
      }),
      transformResponse: (response) => ({
        data: response.data,
        meta: response.meta,
      }),
      providesTags: ["Review"],
    }),
    getSingleReview: build.query({
      query: (id: string) => ({
        url: `/admin/reviews/${id}`,
        method: "GET",
      }),
      providesTags: ["Review"],
    }),
    toggleReviewVisibility: build.mutation({
      query: (id: string) => ({
        url: `/admin/reviews/${id}/toggle`,
        method: "PATCH",
      }),
      invalidatesTags: ["Review"],
    }),

    // ── CLIENTS ─────────────────────────────────────────────
    getAllClients: build.query({
      query: (args?: Record<string, unknown>) => ({
        url: "/admin/clients",
        method: "GET",
        params: buildParams(args),
      }),
      transformResponse: (response) => ({
        data: response.data,
        meta: response.meta,
      }),
      providesTags: ["Client"],
    }),
    blockUser: build.mutation({
      query: (userId: string) => ({
        url: `/admin/clients/${userId}/block`,
        method: "PATCH",
      }),
      invalidatesTags: ["Client"],
    }),
    unblockUser: build.mutation({
      query: (userId: string) => ({
        url: `/admin/clients/${userId}/unblock`,
        method: "PATCH",
      }),
      invalidatesTags: ["Client"],
    }),

    // ── CONTENT ─────────────────────────────────────────────
    getAllContent: build.query({
      query: () => ({
        url: "/admin/content",
        method: "GET",
      }),
      providesTags: ["Content"],
    }),
    upsertContent: build.mutation({
      query: ({ type, body }: { type: string; body: string }) => ({
        url: `/admin/content/${type}`,
        method: "PUT",
        data: { body },
      }),
      invalidatesTags: ["Content"],
    }),
    addFAQ: build.mutation({
      query: (data: { question: string; answer: string }) => ({
        url: "/admin/content/faq",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Content"],
    }),
    updateFAQ: build.mutation({
      query: ({
        index,
        ...data
      }: {
        index: number;
        question?: string;
        answer?: string;
      }) => ({
        url: `/admin/content/faq/${index}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["Content"],
    }),
    deleteFAQ: build.mutation({
      query: (index: number) => ({
        url: `/admin/content/faq/${index}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Content"],
    }),
  }),
});

export const {
  // dashboard
  useGetDashboardStatsQuery,
  useGetRecentActivityQuery,
  // orders
  useGetAllOrdersQuery,
  useGetSingleOrderQuery,
  useChangeOrderStatusMutation,
  useDeleteOrderMutation,
  // reviews
  useGetAllReviewsQuery,
  useGetSingleReviewQuery,
  useToggleReviewVisibilityMutation,
  // clients
  useGetAllClientsQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
  // content
  useGetAllContentQuery,
  useUpsertContentMutation,
  useAddFAQMutation,
  useUpdateFAQMutation,
  useDeleteFAQMutation,
} = adminApi;
