import { TaskEntity, TaskInput } from "../../../domain/entities/taskentity";
import { IAdminRepositories } from "../../../domain/repositories/adminrepositories";


    

export class CreateTask_useCase {
    constructor(
        private adminrep:IAdminRepositories
    ) {
        
    }

    async execute(data:TaskInput):Promise<TaskEntity>{
        const task=await this.adminrep.createTask(data)
        return task
    }
}
