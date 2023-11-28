import { configureStore } from "@reduxjs/toolkit"
import { authApiSlice } from "../features/auth/auth-api-slice"
import { generosApiSlice } from "../features/generos/generos-api-slice"
import { peliculasApiSlice } from "../features/peliculas/peliculas-api-slice"
import { authSlice } from "../features/auth/auth-slice"
import { imagesSlice } from "../features/images/images-slice"
import { imagesApiSlice } from "../features/images/images-api-slice"

export const store = configureStore({
    reducer: {
        [authApiSlice.reducerPath]: authApiSlice.reducer,
        [generosApiSlice.reducerPath]: generosApiSlice.reducer,
        [peliculasApiSlice.reducerPath]: peliculasApiSlice.reducer,
        [imagesApiSlice.reducerPath]: imagesApiSlice.reducer,
        auth: authSlice.reducer,
        images: imagesSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApiSlice.middleware, generosApiSlice.middleware, peliculasApiSlice.middleware, imagesApiSlice.middleware),
    devTools: true
})