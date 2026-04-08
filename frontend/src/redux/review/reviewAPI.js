import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { getBaseURL } from "../../utils/baseURL";


export const reviewApi = createApi({
    reducerPath: 'reviewApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseURL()}/api/reviews`,
        credentials: 'include',
    }),
    tagTypes: ['Review'],
    endpoints: (builder) => ({
        createReview: builder.mutation({
            query: (reviewData) => ({
                url: '/',
                method: 'POST',
                body: reviewData,
            }),
            invalidatesTags: ['Review'],
        }),
        getReviewsByProductId: builder.query({
            query: (productId) => `/${productId}`,
            providesTags: ['Review'],
        }),
    }),
});

export const {
    useCreateReviewMutation,
    useGetReviewsByProductIdQuery
} = reviewApi;