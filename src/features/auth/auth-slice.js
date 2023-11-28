import { createSlice } from "@reduxjs/toolkit"

export const authSlice = createSlice({
    name: 'auth',
    initialState: { user: null, token: null, roles: null, persist:JSON.parse(localStorage.getItem("persist")) || false },
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken, roles } = action.payload
            state.user = user
            state.roles = roles
            state.token = accessToken
        },
        logout: (state) => {
            state.user = null,
            state.token = null,
            state.roles = null,
            state.persist = null
        }
    }
})

export const { setCredentials, logout } = authSlice.actions
export const selectCurrentUser = (state) => state.auth.user
export const selectIsPersisted = (state) => state.auth.persist
export const selectCurrentToken = (state) => state.auth.token
export const selectCurrentRoles = (state) => state.auth.roles