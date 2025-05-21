import { TaskEntity, TaskInput } from "../../domain/entities/taskentity";
import { ITask } from "../../infrastractores/database/taskmodel";
import { TaskresponseDto } from "../task.Dto";



export class TaskMap {
//   static async toEntity(dto: TaskInput): Promise<TaskEntity> {
//     return {
//       id: "",  
//       title: dto.title,
//      description:dto.description,
//      priority:dto.priority,
//      assignedTo:dto.assignedTo,
//      checklist:dto.checklist,
//      dueDate:dto.dueDate,
//      status:dto.sta
//     };
//   }

  static toResponse(task: TaskEntity): TaskresponseDto {
    
    return {
      id: task.id,
      _id:task.id,
      title:task.title,
      description:task.description,
      assignedTo:task.assignedTo,
      checklist:task.checklist,
      dueDate:task.dueDate,
      priority:task.priority,
      status:task.status,
      
    };
  }
}
