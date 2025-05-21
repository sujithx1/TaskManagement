import { userEntity } from "../../../domain/entities/userentity";
import { IAdminRepositories } from "../../../domain/repositories/adminrepositories";
import { UserMap } from "../../../dto/mapper/userMap";
import { UserResponseDto } from "../../../dto/userDto";

export class Getusers_useCase{
    constructor(
        private adminrep:IAdminRepositories
    ) {
        
    }

    async execute():Promise<UserResponseDto[]>{
        const users=await this.adminrep.getAllUsers()
        
        return users.map((item)=>UserMap.toResponse(item))


    }
}