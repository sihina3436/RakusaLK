import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getBaseURL } from "../../utils/baseURL";

const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${getBaseURL()}/api/users`,
    credentials: "include",
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    signUP: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/signin",
        method: "POST",
        body: data,
      }),
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/signout",
        method: "POST",
      }),
    }),

    getAllUsers: builder.query({
      query: () => "/",
      providesTags: ["Auth"],
    }),

    updateUserProfile: builder.mutation({
      query: (data) => ({
        url: "/profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
      deleteUser: builder.mutation({
        query: (id) => ({
          url: `/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Auth"],
      }),

      forgotPassword: builder.mutation({
        query: (email) => ({
          url: "/forgot-password",
          method: "POST",
          body: { email },
        }),
      }),

      resetPassword: builder.mutation({
        query: ({ email, otp, newPassword }) => ({
          url: "/reset-password",
          method: "POST",
          body: { email, otp, newPassword },
        }),
      }),

      getUserById: builder.query({
        query: (id) => `/${id}`,
        providesTags: ["Auth"],
      }),
        verifyToken: builder.query({
        query: () => "/verify-token",
        providesTags: ["Auth"],
      }),

  }),
});

export const {
  useSignUPMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetAllUsersQuery,
  useUpdateUserProfileMutation,
  useDeleteUserMutation,
  useGetUserByIdQuery,
  useVerifyTokenQuery,
 useForgotPasswordMutation,   
  useResetPasswordMutation

} = authAPI;

export default authAPI;
