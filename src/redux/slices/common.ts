import { createSlice } from "@reduxjs/toolkit";



const commonSlice = createSlice({
name:"common",
initialState:{
    clicked:false,
},
reducers:{
    setClicked:(state,action)=>{
    state.clicked=action.payload
    },
}
})

export default commonSlice.reducer
export const {setClicked} = commonSlice.actions

