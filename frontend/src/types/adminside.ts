import { UserStateTypes } from "./userside";

export interface AdminInitialStatetypes{
    admin:UserStateTypes|null,
    isAuthenticated:boolean,
    tasks:Tasks_Statetypes[]

}


export interface Task_AssigneeStatus {
    userId: string|UserStateTypes;
    status: 'Pending' | 'Completed';
  }
export interface Tasks_Statetypes{
  _id?:string;
  title: string;
        description: string;
        dueDate: Date;
        priority: 'Low' | 'Medium' | 'High';
        status:'Pending'|'Completed'|'Cancelled'
        assignedTo: Task_AssigneeStatus[]; 
        checklist: string[];
        id?: string;
        // attachments: string[];
       
        
     
}

export interface Task_completeByUser{
  task:Tasks_Statetypes
  user:{
    userId:string,
    name:string
  }
}
export interface TaskInput {
    title: string;
    description: string;
    dueDate: string;
    priority: 'Low' | 'Medium' | 'High';
    assignedTo: string[];
    checklist: string[];
    // attachments: string[];
  }