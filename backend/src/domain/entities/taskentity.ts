import { userEntity } from "./userentity";

export interface Task_AssigneeStatus {
    userId: string|userEntity;
    status: 'Pending' | 'Completed';
}
export interface TaskEntity {
    id: string;
    title: string;
    description: string;
    dueDate: Date;
    priority: 'Low' | 'Medium' | 'High';
    assignedTo: Task_AssigneeStatus[]; // userIds
    checklist: string[];
    // attachments: string[];
    status?:'Pending'|'Completed'|'Cancelled'
  }
  
  export interface TaskInput {
    title: string;
    description: string;
    dueDate: string;
    priority: 'Low' | 'Medium' | 'High';
    assignedTo: Task_AssigneeStatus[];
    checklist: string[];
    // attachments: string[];
  }