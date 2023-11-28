// import { apiSlice } from "../../app/api/api-slice";

import { createApi } from "@reduxjs/toolkit/dist/query/react"
import { createBaseQueryWithResponseInterceptor } from "../../app/api/api-slice"

export const generosApiSlice = createApi({
    reducerPath: 'generosApi',
    baseQuery: createBaseQueryWithResponseInterceptor('http://localhost:3500/generos'),
    endpoints: builder => ({
        createGenero: builder.mutation({
            query: newGenero => ({
                url: '/create',
                method: 'POST',
                body: newGenero
            })
        }),
        getAllGeneros: builder.query({
            query: () => '/getall'
        })
    })
})

export const {
    useCreateGeneroMutation,
    useGetAllGenerosQuery
} = generosApiSlice