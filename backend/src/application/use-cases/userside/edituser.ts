import { AppError } from "../../../configs/apperror";
import { ErrorCodes } from "../../../configs/errorcodes";
import { userEntity } from "../../../domain/entities/userentity";
import { IuserRepo } from "../../../domain/repositories/userRepo";

export class EditUser_useCase {
    constructor(
        private userRep:IuserRepo
    ) {}

    async execute(id:string,name:string,phone:string,prifile_image:string):Promise<userEntity>{

        const user=await this.userRep.findById(id)
        if(!user)throw new AppError(ErrorCodes.user_not_found,400)
        user.name=name,
    user.phone=phone
    if(prifile_image){

        user.prifile_image=prifile_image
    }

    const update=await this.userRep.update(user.id,user)


    if(!update)throw new AppError(ErrorCodes.Server_errors,500)
    return update


    }


    
        
    
}