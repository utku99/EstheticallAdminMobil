import { createSlice } from "@reduxjs/toolkit";



const hubConnectionSlice = createSlice({
name:"hub",
initialState:{
    connection:null,
    message:null,
    connectionId:null,
    totalUsers:0
},
reducers:{
    setConnection:(state,action)=>{
    state.connection=action.payload
    },
    setMessage:(state,action)=>{
    state.message=action.payload
    },
    setConnectionId:(state,action)=>{
    state.connectionId=action.payload
    },
    setTotalUsers:(state,action)=>{
    state.totalUsers=action.payload
    },
}
})

export default hubConnectionSlice.reducer
export const {setConnection,setMessage,setConnectionId,setTotalUsers,} = hubConnectionSlice.actions

