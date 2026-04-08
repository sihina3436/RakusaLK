import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseURL } from "../../utils/baseURL";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseURL()}/api`,
    credentials: "include",
  }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: (orderData) => ({
        url: "/orders/place",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Order"],
    }),

    uplpadPaySlip: builder.mutation({
      query: (formData) => ({
        url: "/upload/uploadPaySlip",
        method: "POST",
        body: formData,
      }),
    }),

    getAllSellerOrders: builder.query({
      query: () => "/orders/getAllOrder",
      providesTags: ["Order"],
    }),

    getUserOrders: builder.query({
      query: () => "/orders/getUserOrders",
      providesTags: ["Order"],
    }),

    getOrderById: builder.query({
      query: (id) => `/orders/orders/${id}`,
      providesTags: ["Order"],
    }),

    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/orders/${id}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Order"],
    }),

    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  usePlaceOrderMutation,
  useGetAllSellerOrdersQuery,
  useGetUserOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
  useDeleteOrderMutation,
  useUplpadPaySlipMutation
} = orderApi;
