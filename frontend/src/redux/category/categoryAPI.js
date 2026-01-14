import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseURL } from "../../utils/baseURL";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseURL()}/api/categories`,
    credentials: "include",
  }),
  tagTypes: ["Category", "SubCategory"],
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),

    getAllCategories: builder.query({
      query: () => "/",
      providesTags: ["Category"],
    }),

    createSubCategory: builder.mutation({
      query: (data) => ({
        url: "/sub",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SubCategory"],
    }),

    getSubCategoryByCategory: builder.query({
      query: (categoryId) => `/${categoryId}/sub`,
      providesTags: ["SubCategory"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useCreateSubCategoryMutation,
  useGetSubCategoryByCategoryQuery,
} = categoryApi;
