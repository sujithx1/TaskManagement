import { TaskEntity } from "../../../domain/entities/taskentity"
import { IAdminRepositories } from "../../../domain/repositories/adminrepositories"
import { TaskMap } from "../../../dto/mapper/taskMap"
import { TaskresponseDto } from "../../../dto/task.Dto"

export class GetAllTasks_useCase{
    constructor(
        private adminrep:IAdminRepositories
    ) {
        
    }

    async execute():Promise<TaskresponseDto[]>{
        const tasks=await this.adminrep.getAllTasks()
        return tasks.map((item)=>TaskMap.toResponse(item))


    }
}