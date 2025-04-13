import { TaskEntity } from "../../../domain/entities/taskentity"
import { ItaskRepositories } from "../../../domain/repositories/taskrepo"

export class GetTaskUserSide_useCase{
    constructor(
        private taskrep:ItaskRepositories
    ) {
        
    }

    async execute(userId:string):Promise<TaskEntity[]>{
        const tasks=await this.taskrep.findByassignId(userId)
        return tasks


    }
}