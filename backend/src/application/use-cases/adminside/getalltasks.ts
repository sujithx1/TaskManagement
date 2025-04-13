import { TaskEntity } from "../../../domain/entities/taskentity"
import { IAdminRepositories } from "../../../domain/repositories/adminrepositories"

export class GetAllTasks_useCase{
    constructor(
        private adminrep:IAdminRepositories
    ) {
        
    }

    async execute():Promise<TaskEntity[]>{
        const tasks=await this.adminrep.getAllTasks()
        return tasks


    }
}