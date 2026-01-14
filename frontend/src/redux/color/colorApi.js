import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseURL } from "../../utils/baseURL";

export const colorApi = createApi({
  reducerPath: "colorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseURL()}/api/colors`,
    credentials: "include",
  }),
  tagTypes: ["Color"],
  endpoints: (builder) => ({
    createColor: builder.mutation({
      query: (colorData) => ({
        url: "/",
        method: "POST",
        body: colorData,
      }),
      invalidatesTags: ["Color"],
    }),

    getAllColors: builder.query({
      query: () => "/",
      providesTags: ["Color"],
    }),
  }),
});

export const {
  useCreateColorMutation,
  useGetAllColorsQuery,
} = colorApi;
