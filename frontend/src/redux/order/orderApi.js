import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseURL } from "../../utils/baseURL";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseURL()}/api/orders`,
    credentials: "include",
  }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: (orderData) => ({
        url: "/place",
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["Order"],
    }),

    getAllSellerOrders: builder.query({
      query: () => "/getAllOrder",
      providesTags: ["Order"],
    }),

    getUserOrders: builder.query({
      query: () => "/getUserOrders",
      providesTags: ["Order"],
    }),

    getOrderById: builder.query({
      query: (id) => `/${id}`,
      providesTags: ["Order"],
    }),

    updateOrderStatus: builder.mutation({
      query: ({ id, status }) => ({
        url: `/${id}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Order"],
    }),

    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
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
} = orderApi;
