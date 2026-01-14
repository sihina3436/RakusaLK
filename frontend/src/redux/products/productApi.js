import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseURL } from "../../utils/baseURL";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseURL()}/api/products`,
    credentials: "include",
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (formData) => ({
        url: "/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Product"],
    }),

    getAllProducts: builder.query({
      query: () => "/",
      providesTags: ["Product"],
    }),

    getProductById: builder.query({
      query: (id) => `/${id}`,
    }),

    getProductbyCategory: builder.query({
      query: (categoryId) => `/category/${categoryId}`,
    }),

    getProductbySubCategory: builder.query({
      query: (subCategoryId) => `/subcategory/${subCategoryId}`,
    }),

    updateProduct: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Product"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetProductbyCategoryQuery,
  useGetProductbySubCategoryQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
