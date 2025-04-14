import { AppError } from "../../../configs/apperror";
import { ErrorCodes } from "../../../configs/errorcodes";
import { TaskEntity } from "../../../domain/entities/taskentity";
import { IAdminRepositories } from "../../../domain/repositories/adminrepositories";
import { ItaskRepositories } from "../../../domain/repositories/taskrepo";


export class RemoveUserTask_useCase{
    constructor(
        private taskrepo:ItaskRepositories,
        private admintaskrepo:IAdminRepositories
    ) {
        
    }

    async execute(taskId:string,userId:string):Promise<TaskEntity|null>
    {
        const task=await this.taskrepo.findById(taskId)
        if(!task) throw new AppError(ErrorCodes.Resourse_not_found,400)
        const index=task.assignedTo.findIndex((item)=>item.userId==userId)
    if(index!==-1)
    {
        task.assignedTo.splice(index,1)
    }
    if (task.assignedTo.length==0) {
        await this.taskrepo.findTaskandDelete(taskId)
        return null

        
    }

    const update=await this.admintaskrepo.updateTask(taskId,task)
    if(!update)throw new AppError(ErrorCodes.Server_errors,500)
    return update

  
    }
}