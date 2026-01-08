import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getBaseURL } from '../../utils/baseURL';


const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({
        baseUrl:`${getBaseURL()}/api/users`,
        credentials: 'include',
    }),
    tagTypes:['auth'],
    endpoints: (builder) => ({
        signUP: builder.mutation({
            query: (data) => ({
                url: '/register',
                method: 'POST',
                body: data,
                headers: { 'Content-Type': 'application/json' },
            }),
            
        }),
        login: builder.mutation({
            query: (data) => ({
                url: '/signin',  
                method: 'POST',
                body: data,
                headers: { 'Content-Type': 'application/json' },
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/signout',
                method: 'POST',
            }),
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: '/',   
                method: 'GET',
            }),
            providesTags: ['auth'],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['auth'],
        }),
        updateUserProfile: builder.mutation({
            query: (data) => ({
                url: '/profile',
                method: 'PUT',
                body: data,
                headers: { 'Content-Type': 'application/json' },
            }),
            invalidatesTags: ['auth'],
        }),

    }),
});

export const {
    useSignUPMutation,
    useLoginMutation,   
    useLogoutMutation,
    useGetAllUsersQuery,
    useDeleteUserMutation,
    useUpdateUserProfileMutation,
} = authAPI;
export default authAPI;