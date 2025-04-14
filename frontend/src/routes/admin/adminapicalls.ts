import { createAsyncThunk } from "@reduxjs/toolkit";
import { ErrorPayload, UserStateTypes } from "../../types/userside";
import adminapi from "../../api/adminaxios";
import { isAxiosError } from "axios";
import { TaskInput, Tasks_Statetypes } from "../../types/adminside";

export const getAllusers = createAsyncThunk<UserStateTypes[],void,{rejectValue:ErrorPayload}>(
    'admin/getallusers',
    async (_, { rejectWithValue }) => {
      try {
        const response = await adminapi.get('/users'); // Adjust the endpoint
        return response.data.users;
      } catch (error) {
        if (isAxiosError(error)) {
            return rejectWithValue({
              message:error.response?.data.error
              ,status:error.response?.status
            })
      
            
          }
          return rejectWithValue({
            message:"something wrong"
          })
      }
    }
  );
  
export const createTasks = createAsyncThunk<Tasks_Statetypes,TaskInput,{rejectValue:ErrorPayload}>(
    'admin/addTasks',
    async (taskData, { rejectWithValue }) => {
      try {
        const response = await adminapi.post('/task',taskData); // Adjust the endpoint
        return response.data.task;
      } catch (error) {
        if (isAxiosError(error)) {
            return rejectWithValue({
              message:error.response?.data.error
              ,status:error.response?.status
            })
      
            
          }
          return rejectWithValue({
            message:"something wrong"
          })
      }
    }
  );
export const EditTaks = createAsyncThunk<Tasks_Statetypes,Tasks_Statetypes,{rejectValue:ErrorPayload}>(
    'admin/edittasks',
    async (taskData, { rejectWithValue }) => {
      try {
        const response = await adminapi.put(`/task/${taskData.id}`,taskData); // Adjust the endpoint
        return response.data.task;
      } catch (error) {
        if (isAxiosError(error)) {
            return rejectWithValue({
              message:error.response?.data.error
              ,status:error.response?.status
            })  
      
            
          }
          return rejectWithValue({
            message:"something wrong"
          })
      }
    }
  );
  
  
export const getAllTask = createAsyncThunk<Tasks_Statetypes[],void,{rejectValue:ErrorPayload}>(
    'admin/getTasks',
    async (_, { rejectWithValue }) => {
      try {
        const response = await adminapi.get('/tasks'); // Adjust the endpoint
        console.log(response.data.tasks);
        
        return response.data.tasks;
      } catch (error) {
        if (isAxiosError(error)) {
            return rejectWithValue({
              message:error.response?.data.error
              ,status:error.response?.status
            })
      
            
          }
          return rejectWithValue({
            message:"something wrong"
          })
      }
    }
  );
  

  
export const removeTaskfromUser = createAsyncThunk<Tasks_Statetypes,{userId:string,taskId:string},{rejectValue:ErrorPayload}>(
  'admin/removeTask',
  async (data, { rejectWithValue }) => {
    try {
      const response = await adminapi.patch(`/task-remove-userid/${data.taskId}`,data); // Adjust the endpoint
      console.log(response.data.task);
      
      return response.data.task;
    } catch (error) {
      if (isAxiosError(error)) {
          return rejectWithValue({
            message:error.response?.data.error
            ,status:error.response?.status
          })
    
          
        }
        return rejectWithValue({
          message:"something wrong"
        })
    }
  }
);
