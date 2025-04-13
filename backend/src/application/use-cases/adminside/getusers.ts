import { userEntity } from "../../../domain/entities/userentity";
import { IAdminRepositories } from "../../../domain/repositories/adminrepositories";

export class Getusers_useCase{
    constructor(
        private adminrep:IAdminRepositories
    ) {
        
    }

    async execute():Promise<userEntity[]>{
        const users=await this.adminrep.getAllUsers()
        
        return users


    }
}