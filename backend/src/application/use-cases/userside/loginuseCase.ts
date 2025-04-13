import { AppError } from "../../../configs/apperror";
import { ErrorCodes } from "../../../configs/errorcodes";
import { userEntity } from "../../../domain/entities/userentity";
import { IuserRepo } from "../../../domain/repositories/userRepo";
import bcrypt from "bcrypt";

export class LoginuseCase_user{
    constructor(
        private userrep:IuserRepo
    ) {
        
    }
    async execute(email:string,password:string):Promise<userEntity>{
        const user=await this.userrep.findByEmail(email)
        if(!user) throw new AppError(ErrorCodes.user_not_found,400)
        
        const comparepass=await bcrypt.compare(password,user.password)
        if(!comparepass)throw new AppError(ErrorCodes.password_match,400)
        return user
    }
}