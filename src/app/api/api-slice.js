import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { setCredentials, logout } from "../../features/auth/auth-slice"

// const baseQuery = fetchBaseQuery({
//     baseUrl: 'http://localhost:3500',
//     credentials: 'include',
//     prepareHeaders: (headers, { getState }) => {
//         const token = getState().auth.token
//         if (token) {
//             headers.set('Authorization', `Bearer ${token}`)
//         }
//     }
// })

// const baseQueryWithReauth = async (args, api, extraOptions) => {
//     let result = await baseQuery(args, api, extraOptions)

//     if (result?.error?.originalStatus === 403) {
//         console.log('sending refresh token')

//         const refreshResult = await baseQuery('/refresh', api, extraOptions)
//         console.log(refreshResult)
//         if (refreshResult?.data) {
//             const user = api.getState().auth.user
//             api.dispatch(setCredentials({ ...refreshResult.data, user }))
//             result = await baseQuery(args, api, extraOptions)
//         } else {
//             api.dispatch(logout())
//         }
//     }

//     return result
// }



// Function to generate baseQuery with response interceptor
export const createBaseQueryWithResponseInterceptor = (baseUrl) => {
    const baseQuery = fetchBaseQuery({
        baseUrl,
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
        },
    });

    const baseQueryWithResponseInterceptor = async (arg, api, extraOptions) => {
        let result = await baseQuery(arg, api, extraOptions);

        if (result?.error?.originalStatus === 403) {
            console.log('Sending refresh token');

            const refreshResult = await baseQuery('http://localhost:3500/refresh', api, extraOptions);

            console.log('Refresh Result:', refreshResult);

            if (refreshResult?.data) {
                const user = api.getState().auth.user;
                api.dispatch(setCredentials({ ...refreshResult.data, user }));
                result = await baseQuery(arg, api, extraOptions);
            } else {
                api.dispatch(logout());
            }
        }

        return result;
    };

    return baseQueryWithResponseInterceptor;
};
