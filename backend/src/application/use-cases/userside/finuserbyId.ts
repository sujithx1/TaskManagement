import { AppError } from "../../../configs/apperror";
import { userEntity } from "../../../domain/entities/userentity";
import { IuserRepo } from "../../../domain/repositories/userRepo";
import { UserMap } from "../../../dto/mapper/userMap";
import { UserResponseDto } from "../../../dto/userDto";


export class GetUserById_useCase{
    constructor(
        private userRep:IuserRepo
    ){}

    async execute(id:string):Promise<UserResponseDto>{
        const user=await this.userRep.findById(id)
        if(!user)throw new AppError('user not found')
        return UserMap.toResponse(user)
    }
}