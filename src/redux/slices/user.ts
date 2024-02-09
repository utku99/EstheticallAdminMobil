import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        isLoggedIn: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        },
    }
})

export default userSlice.reducer
export const { setUser, setLoggedIn } = userSlice.actions
