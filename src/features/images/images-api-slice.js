// import { apiSlice } from "../../app/api/api-slice";

import { createApi } from "@reduxjs/toolkit/dist/query/react"
import { createBaseQueryWithResponseInterceptor } from "../../app/api/api-slice"

export const imagesApiSlice = createApi({
    reducerPath: 'imagesApi',
    baseQuery: createBaseQueryWithResponseInterceptor('http://localhost:3500/image'),
    endpoints: builder => ({
        uploadImage: builder.mutation({
            query: (imageFile) => {
                var bodyFormData = new FormData();
                bodyFormData.append('upload', imageFile);
                console.log(imageFile)
                return {
                  url: '/upload',
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json'
                  },
                  body: bodyFormData,
                  formData: true           //add this line 👈
                };
              }
        }),
        // getAllGeneros: builder.query({
        //     query: () => '/getall'
        // })
    })
})

export const {
    useUploadImageMutation
} = imagesApiSlice