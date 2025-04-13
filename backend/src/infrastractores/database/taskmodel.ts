import mongoose, { Schema, Document } from 'mongoose';
export interface Task_AssigneeStatus {
    userId: string;
    status: 'Pending' | 'Completed';
  }

export interface ITask extends Document {
    id:string;
  title: string;
  description: string;
  dueDate: Date;
  status: 'Pending' | 'Completed'|'Cancelled';
  priority: 'Low' | 'Medium' | 'High';
  assignedTo: Task_AssigneeStatus[]; // User IDs
  checklist: string[];
  // attachments: string[];
}

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: String,
  dueDate: Date,
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
  assignedTo: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' }
    } ]
    ,
     checklist: [String],
  // attachments: [String],
  status:{
    type:String,
    enum:['Pending','Completed',"Cancelled"],
    default:'Pending'
  }
});

export const TaskModel = mongoose.model<ITask>('Task', TaskSchema);
