import { createSlice } from "@reduxjs/toolkit";
import { getStoredAdmin } from "../configs/getadminloacl";
import { AdminInitialStatetypes } from "../types/adminside";
import { getAllTask } from "../routes/admin/adminapicalls";



const initialState:AdminInitialStatetypes = {
    admin: getStoredAdmin()||null,
    isAuthenticated: !!getStoredAdmin(),
    tasks:[]

  };
  

const adminslice=createSlice({
    name:'admin',
    initialState,
    reducers:{

        loginSuccess_admin: (state, action) => {
            state.admin = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem('admin', JSON.stringify(action.payload)); // Persist
          },
          logout_admin: (state) => {
            state.admin = null;
            state.isAuthenticated = false;
            localStorage.removeItem('admin'); 
          },
          add_Tasks:(state,action)=>{
            state.tasks=action.payload
          },
          setTask: (state, action) => {
            const newTask = action.payload;
            console.log(state.tasks);
            
            const index = state.tasks.findIndex(item => {
              console.log("item._id:", item._id);
              console.log("newTask._id:", newTask.id); // Make sure it's _id, not id
              return item._id === newTask._id;
            });
            
            console.log(index);
            
            
            if (index !== -1) {
              state.tasks[index] = newTask;
            }
          },removeTask:(state,action)=>{
            const index=state.tasks.findIndex((item)=>item.id==action.payload)
            console.log(index);
            
            if(index!==-1){
              console.log("index !==-1");
              
              state.tasks.splice(index,1)
            }


          },
          removeUserfromTask: (state, action) => {
            const taskIndex = state.tasks.findIndex(item => item.id === action.payload.taskId);
          
            if (taskIndex !== -1) {
              state.tasks[taskIndex].assignedTo = state.tasks[taskIndex].assignedTo.filter(user => {
                if (typeof user.userId === 'object' && user.userId !== null && '_id' in user.userId) {
                  return user.userId._id !== action.payload.userId;
                } else if (typeof user.userId === 'string') {
                  return user.userId !== action.payload.userId;
                }
                return true;
              });
            }
          }
          
          
    },
    extraReducers(builder) {
        builder
        .addCase(getAllTask.fulfilled,(state,action)=>{
          state.tasks=action.payload
        })
    },

})









export const{loginSuccess_admin,logout_admin,add_Tasks,setTask,removeTask,removeUserfromTask}=adminslice.actions
export default adminslice.reducer