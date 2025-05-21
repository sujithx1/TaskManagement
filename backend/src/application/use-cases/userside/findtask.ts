import { TaskEntity } from "../../../domain/entities/taskentity"
import { ItaskRepositories } from "../../../domain/repositories/taskrepo"
import { TaskMap } from "../../../dto/mapper/taskMap"

export class GetTaskUserSide_useCase{
    constructor(
        private taskrep:ItaskRepositories
    ) {
        
    }

    async execute(userId:string):Promise<TaskEntity[]>{
        const tasks=await this.taskrep.findByassignId(userId)
        return tasks.map((item)=>TaskMap.toResponse(item))
    }
}