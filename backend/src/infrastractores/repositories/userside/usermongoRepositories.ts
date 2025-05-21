import { userEntity } from "../../../domain/entities/userentity";
import { IuserRepo } from "../../../domain/repositories/userRepo";
import { UserMap } from "../../../dto/mapper/userMap";
import { UserResponseDto } from "../../../dto/userDto";
import { Iuser, userModel } from "../../database/usermodel";

export const returnUserEntity = (user: Iuser): userEntity => {
  return {
    id: user.id.toString(),
    name:user.name,
    email:user.email,
    phone:user.phone,
    password:user.password,
    isBlock:user.isBlock,
    isAdmin:user.isAdmin,
    createdAt:user.createdAt,
    updatedAt:user.updatedAt
  
  };
};


export class UserRepoMongo implements IuserRepo {
async create(user: userEntity): Promise<userEntity> {
    const newUser = new userModel(user);
    const saved = await newUser.save();
    return returnUserEntity(saved)
    
}
async findByEmail(email: string): Promise<userEntity | null> {
    const user = await userModel.findOne({ email });
    if (!user) return null;
    return returnUserEntity(user)
    
}

async findById(id: string): Promise<userEntity | null> {
    const user=await userModel.findById(id)
    if(!user)return null
    return returnUserEntity(user)
    
}
async update(id: string, user: userEntity): Promise<userEntity | null> {
    const updateUser = await userModel.findByIdAndUpdate(id, user, { new: true });
    if(!updateUser)return null
    return returnUserEntity(updateUser)

    
    
}


  }
  