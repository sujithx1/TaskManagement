import { AppError } from "../../../configs/apperror";
import { ErrorCodes } from "../../../configs/errorcodes";
import { userEntity } from "../../../domain/entities/userentity";
import { IuserRepo } from "../../../domain/repositories/userRepo";
import bcrypt from "bcrypt";
import { UserResponseDto } from "../../../dto/userDto";
import { UserMap } from "../../../dto/mapper/userMap";

export class LoginuseCase_user{
    constructor(
        private userrep:IuserRepo
    ) {
        
    }
    async execute(email:string,password:string):Promise<UserResponseDto>{
        const user=await this.userrep.findByEmail(email)
        if(!user) throw new AppError(ErrorCodes.user_not_found,400)
        
        const comparepass=await bcrypt.compare(password,user.password)
        if(!comparepass)throw new AppError(ErrorCodes.password_match,400)
        return UserMap.toResponse(user)
    }
}