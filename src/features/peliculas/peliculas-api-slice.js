// import { apiSlice } from "../../app/api/api-slice";

import { createApi } from "@reduxjs/toolkit/dist/query/react"
import { createBaseQueryWithResponseInterceptor } from "../../app/api/api-slice"

export const peliculasApiSlice = createApi({
    reducerPath: 'peliculasApi',
    baseQuery: createBaseQueryWithResponseInterceptor('http://localhost:3500/peliculas'),
    endpoints: builder => ({
        createPelicula: builder.mutation({
            query: newPelicula => ({
                url: '/create',
                method: 'POST',
                body: newPelicula
            })
        }),
        getAllPeliculas: builder.query({
            query: () => '/getall'
        }),
        getPeliculasGenres: builder.query({
            query: () => '/getgenres'
        }),
        getPeliculasAños: builder.query({
            query: () => '/getanos'
        }),
        getPeliculasDirectores: builder.query({
            query: () => '/getdirectores'
        }),
        filterPeliculas: builder.query({
            query: (filters) => `/filter?${new URLSearchParams(filters).toString()}`
        })
    })
})

export const {
    useCreatePeliculaMutation,
    useGetAllPeliculasQuery,
    useGetPeliculasGenresQuery,
    useGetPeliculasAñosQuery,
    useGetPeliculasDirectoresQuery,
    useLazyFilterPeliculasQuery
} = peliculasApiSlice