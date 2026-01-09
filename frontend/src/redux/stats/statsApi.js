import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseURL } from "../../utils/baseURL";

const StatsApi = createApi({
  reducerPath: "StatsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseURL()}/api/stats`,
    credentials: "include",
  }),
  tagTypes: ["Stats"],
  endpoints: (builder) => ({
    getUserStats: builder.query({
      query: () => ({
        url: "/user",
        method: 'GET'
      }),
      providesTags: ["Stats"],
    }),
    getSellerStats: builder.query({
      query: () => ({
        url: "/admin",
        method: 'GET'
      
      }),
      providesTags: ["Stats"],
    }),
  }),
});

export const {
  useGetUserStatsQuery,
  useGetSellerStatsQuery,
} = StatsApi;

export default StatsApi;
