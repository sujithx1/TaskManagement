import { Task_AssigneeStatus } from "../domain/entities/taskentity";


export interface TaskresponseDto{
    _id?:string
     id: string;
        title: string;
        description: string;
        dueDate: Date;
        priority: 'Low' | 'Medium' | 'High';
        assignedTo: Task_AssigneeStatus[]; // userIds
        checklist: string[];
        // attachments: string[];
        status?:'Pending'|'Completed'|'Cancelled'
        createdAt?:Date
        updatedAt?:Date
}