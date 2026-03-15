import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseURL } from "../../utils/baseURL";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseURL()}/api`,
    credentials: "include",
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({

    //  1️⃣ Upload Multiple Images
    uploadImages: builder.mutation({
      query: (formData) => ({
        url: "/upload/uploadMultipleImages",
        method: "POST",
        body: formData,
      }),
    }),

    //  2️⃣ Create Product
    createProduct: builder.mutation({
      query: (productData) => ({
        url: "/products",
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["Product"],
    }),

    //  3️⃣ Get All Products
    getAllProducts: builder.query({
      query: () => "/products",
      providesTags: ["Product"],
    }),

    //  4️⃣ Get Product By ID
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
    }),

    //  5️⃣ Get Products By Category
    getProductbyCategory: builder.query({
      query: (categoryId) => `/products/category/${categoryId}`,
    }),

    //  6️⃣ Get Products By SubCategory
    getProductbySubCategory: builder.query({
      query: (subCategoryId) => `/products/subcategory/${subCategoryId}`,
    }),

    //  7️⃣ Update Product
    updateProduct: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["Product"],
    }),

    //  8️⃣ Delete Product
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

  }),
});

export const {
  useUploadImagesMutation,
  useCreateProductMutation,
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetProductbyCategoryQuery,
  useGetProductbySubCategoryQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
