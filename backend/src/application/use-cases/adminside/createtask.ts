import { TaskEntity, TaskInput } from "../../../domain/entities/taskentity";
import { IAdminRepositories } from "../../../domain/repositories/adminrepositories";
import { TaskMap } from "../../../dto/mapper/taskMap";
import { TaskresponseDto } from "../../../dto/task.Dto";


    

export class CreateTask_useCase {
    constructor(
        private adminrep:IAdminRepositories
    ) {
        
    }

    async execute(data:TaskInput):Promise<TaskresponseDto>{
        const task=await this.adminrep.createTask(data)
        return TaskMap.toResponse(task)
    }
    
}
