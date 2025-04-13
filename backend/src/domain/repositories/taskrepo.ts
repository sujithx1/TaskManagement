import { TaskEntity } from "../entities/taskentity";


export interface ItaskRepositories{
    findByassignId(assignId:string):Promise<TaskEntity[]>
    findById(taskId:string):Promise<TaskEntity|null>
    findTaskandUpdateAssignId(taskId:string,assignId:string,status:"Completed"):Promise<TaskEntity|null>

}