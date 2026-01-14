import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { getBaseURL } from "../../utils/baseURL";


export const sizeApi = createApi({
    reducerPath: 'sizeApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseURL()}/api/sizes`,
        credentials: 'include',

    }),
    tagTypes: ['Size'],
    endpoints: (builder) => ({
        createSize: builder.mutation({  
            query: (sizeData) => ({
                url: '/sizes',
                method: 'POST',
                body: sizeData,
            }),
            invalidatesTags: ['Size'],
        }),
        getAllSizes: builder.query({
            query: () => '/sizes',
            providesTags: ['Size'],
        }),
    }),
});

export const {
    useCreateSizeMutation,
    useGetAllSizesQuery,
} = sizeApi;
