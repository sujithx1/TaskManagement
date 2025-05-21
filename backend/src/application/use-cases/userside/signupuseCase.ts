import bcrypt from "bcrypt";
import { IuserRepo } from "../../../domain/repositories/userRepo";
import { userEntity } from "../../../domain/entities/userentity";
import { AppError } from "../../../configs/apperror";
import { UserMap } from "../../../dto/mapper/userMap";
import { UserResponseDto } from "../../../dto/userDto";

export class User_signupuseCase{
    constructor(
        private userrep:IuserRepo
    ) {
        
    }

 async registerUser (
        
        name: string,
        email: string,
        password: string,
        phone:string
      ) :Promise<UserResponseDto>{
        const existing = await this.userrep.findByEmail(email);
        if (existing) throw new AppError("User already exists",400);
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user=await this.userrep.create({id:"", name, email, password: hashedPassword,phone, });
      
        return  UserMap.toResponse(user)
}
}