import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const baseURI = "http://localhost:4000";

export const apiSlice = createApi({
    baseQuery:fetchBaseQuery({baseUrl:baseURI}),
    endpoints: builder => ({

        // get categories
        getCategories: builder.query({
            //get: 'http://localhost:4000/api/v1/categories'
            query: () => "/api/v1/categories",
            providesTags:["categories"]
        }),

        // get labels
        getLabels: builder.query({
            //get: 'http://localhost:4000/api/v1/categories'
            query: () => "/api/v1/labels",
            providesTags:["transactions"]
        }),

        // add transaction
        addTransaction: builder.mutation({
            //get: 'http://localhost:4000/api/v1/categories'
            query: (initialTransaction) => ({
                url:"/api/v1/transaction",
                method:"POST",
                body:initialTransaction
            }),
            invalidatesTags:["transactions"]
        }),

        // delete record
        deleteTransaction: builder.mutation({
            query: transactionId => ({
                url:`/api/v1/transaction`,
                method:"DELETE",
                params:transactionId
            }),
            invalidatesTags:["transactions"]
        }),
    })
})

export default apiSlice