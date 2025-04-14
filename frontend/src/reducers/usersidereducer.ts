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
          addTask_user:(state,action)=>{
            const newTask=action.payload
            state.tasks.push(newTask)

          },
          removeTask:(state,action)=>{
            const index=state.tasks.findIndex((item)=>item.id==action.payload)
            if(index!==-1){
              state.tasks.splice(index,1)
            }


          },

    }
    ,extraReducers(builder) {
        builder
        .addCase(getTasks.fulfilled,(state,action)=>{
          state.tasks=action.payload
        })
        
    },

})




export const {loginSuccess,logout,addTask_user,removeTask}=userslice.actions
export default userslice.reducer