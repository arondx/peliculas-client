import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { createBaseQueryWithResponseInterceptor } from "../../app/api/api-slice";

export const authApiSlice = createApi({
    reducerPath: 'authApi',
    baseQuery: createBaseQueryWithResponseInterceptor('http://localhost:3500'),
    endpoints: builder => ({
        auth: builder.mutation({
            query: credentials => ({
                url: '/auth',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        refresh: builder.query({
            query: () => '/refresh'
        }),
        logout: builder.query({
            query: () => '/logout'
        })
    })
})

// export const authApiSlice = apiSlice.injectEndpoints({
//     endpoints: builder => ({
//         auth: builder.mutation({
//             query: credentials => ({
//                 url: '/auth',
//                 method: 'POST',
//                 body: {...credentials}
//             })
//         }),
//         refresh: builder.query({
//             query: () => '/refresh'
//         }),
//         logout: builder.query({
//             query: () => '/logout'
//         })
//     })
// })

export const {
    useAuthMutation,
    useLazyRefreshQuery,
    useRefreshQuery,
    useLogoutQuery
} = authApiSlice