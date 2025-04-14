import { Tasks_Statetypes } from "./adminside";

export interface UserStateTypes{
        id: string;
        _id?:string;
        name: string;
        email: string;
        phone: string;
        isBlocked?: boolean;
        authSourse?: string;
        role?: string;
        isAdmin?:boolean;
        profilePic: string;
      
}

export interface UserInitialStatetypes{
    user:UserStateTypes|null,
    isAuthenticated:boolean,
    tasks:Tasks_Statetypes[]

}
export interface UserSignUpTypes {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirm_password: string;
  }
  export interface UserLogin_types{
    email:string;
    password:string
  }

  export interface ErrorPayload {
    message: string;
    status?: number;
  }

  export interface Alert{
    action:boolean;
    message: string;
    type: 'success' | 'error' | 'info' | 'warning'|'idel';
   
  }

  export interface TaskNoty{
    assignUser:string[],
    task:Tasks_Statetypes
  }