import { createSlice } from "@reduxjs/toolkit";
import { getStoredUser } from "../configs/getuserlocal";
import { UserInitialStatetypes } from "../types/userside";
import { getTasks } from "../routes/user/userapicalls";





const initialState:UserInitialStatetypes = {
    user: getStoredUser()||null,
    isAuthenticated: !!getStoredUser(),
    tasks:[]
  };
  
const userslice=createSlice({
    name:'user',
    initialState,
    reducers:{
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem('user', JSON.stringify(action.payload)); // Persist
          },
          logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('user'); 
          },

    }
    ,extraReducers(builder) {
        builder
        .addCase(getTasks.fulfilled,(state,action)=>{
          state.tasks=action.payload
        })
        
    },

})




export const {loginSuccess,logout}=userslice.actions
export default userslice.reducer