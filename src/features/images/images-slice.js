import { createSlice } from "@reduxjs/toolkit"

export const imagesSlice = createSlice({
    name: 'images',
    initialState: { imageData: null },
    reducers: {
        setImageData: (state, action) => {
            const { imageData } = action.payload
            state.imageData = imageData
        },
        resetImageData: (state) => {
            state.imageData = null
        }
    }
})

export const { setImageData, resetImageData } = imagesSlice.actions
export const selectCurrentImageData = (state) => state.images.imageData