import { AppError } from "../../../configs/apperror";
import { userEntity } from "../../../domain/entities/userentity";
import { IuserRepo } from "../../../domain/repositories/userRepo";


export class GetUserById_useCase{
    constructor(
        private userRep:IuserRepo
    ){}

    async execute(id:string):Promise<userEntity>{
        const user=await this.userRep.findById(id)
        if(!user)throw new AppError('user not found')
        return user
    }
}