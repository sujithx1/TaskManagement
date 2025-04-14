import { createAsyncThunk } from "@reduxjs/toolkit";
import userapi from "../../api/useraxios";
import { isAxiosError } from "axios";
import { ErrorPayload, UserLogin_types, UserSignUpTypes, UserStateTypes } from "../../types/userside";
import { Tasks_Statetypes } from "../../types/adminside";

export const signupUser = createAsyncThunk<UserStateTypes,UserSignUpTypes,{rejectValue:ErrorPayload}>(
    'user/signup',
    async (formData, { rejectWithValue }) => {
      try {
        const response = await userapi.post('/signup', formData); // Adjust the endpoint
        return response.data;
      } catch (error) {
        if (isAxiosError(error)) {
            return rejectWithValue({
              message:error.response?.data.error
              ,status:error.response?.status
            })
      
            
          }
          return rejectWithValue({
            message:"something wrong "
          })
      }
    }
  );
  

export const loginUser = createAsyncThunk<UserStateTypes,UserLogin_types,{rejectValue:ErrorPayload}>(
    'user/login',
    async (formData, { rejectWithValue }) => {
      try {
        const response = await userapi.post('/login', formData); // Adjust the endpoint

        if(response.data.user.isAdmin){
          localStorage.setItem('admin-token',response.data.token)

        }else{
          localStorage.setItem('user-token',response.data.token)

        }
        return response.data.user;

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
  
  

export const logoutUser = createAsyncThunk<void,string,{rejectValue:ErrorPayload}>(
    'user/logout',
    async (id, { rejectWithValue }) => {
      try {
        console.log(id);
        console.log("logout user",id);
        
        
        const response = await userapi.post(`/logout/${id}`); // Adjust the endpoint
        console.log(response.data);
        
        return response.data;
        
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
  

export const getTasks = createAsyncThunk<Tasks_Statetypes[],string,{rejectValue:ErrorPayload}>(
    'user/getTasks',
    async (id, { rejectWithValue }) => {
      try {
        const response = await userapi.get(`/tasks/${id}`); // Adjust the endpoint
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
export const changeStatusUser = createAsyncThunk<Tasks_Statetypes,{userId:string,taskId:string,status:string},{rejectValue:ErrorPayload}>(
    'user/changeTask',
    async (data, { rejectWithValue }) => {
      try {
        const response = await userapi.patch(`tasks/${data.taskId}/update-status`,data); // Adjust the endpoint
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
  
  