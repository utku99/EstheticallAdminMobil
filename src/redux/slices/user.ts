import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        isLoggedIn: false,
        language:null,
        languages:null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        },
        setLanguage: (state, action) => {
            state.language = action.payload
        },
        setLanguages: (state, action) => {
            state.languages = action.payload
        }
    }
})

export default userSlice.reducer
export const { setUser, setLoggedIn,setLanguage,setLanguages } = userSlice.actions
