import { AppError } from "../../../configs/apperror";
import { ErrorCodes } from "../../../configs/errorcodes";
import { TaskEntity } from "../../../domain/entities/taskentity";
import { IAdminRepositories } from "../../../domain/repositories/adminrepositories";
import { TaskMap } from "../../../dto/mapper/taskMap";
import { TaskresponseDto } from "../../../dto/task.Dto";


export class EditTasks_useCase {
    constructor(
        private adminrep:IAdminRepositories
    ) {
        
    }

    async execute(data:TaskEntity):Promise<TaskresponseDto>{

        const findtask=await this.adminrep.getTaskById(data.id)
        if(!findtask)throw new AppError(ErrorCodes.Resourse_not_found,400)
        findtask.title=data.title
        findtask.priority=data.priority
        findtask.dueDate=data.dueDate
        findtask.description=data.description 
        findtask.checklist=data.checklist 
        // findtask.attachments=data.atta   chments 
        findtask.assignedTo=data.assignedTo
        const update=await this.adminrep.updateTask(findtask.id,findtask)
        if(!update)throw new AppError(ErrorCodes.Server_errors,500)
        return TaskMap.toResponse(update)
    }
}