import { userEntity } from "../../../domain/entities/userentity";
import { IuserRepo } from "../../../domain/repositories/userRepo";
import { userModel } from "../../database/usermodel";



export class UserRepoMongo implements IuserRepo {
async create(user: userEntity): Promise<userEntity> {
    const newUser = new userModel(user);
    const saved = await newUser.save();
    return saved
    
}
async findByEmail(email: string): Promise<userEntity | null> {
    const user = await userModel.findOne({ email });
    if (!user) return null;
    return user.toObject()
    
}

async findById(id: string): Promise<userEntity | null> {
    return await userModel.findById(id)
    
}
async update(id: string, user: userEntity): Promise<userEntity | null> {
    const updateUser = await userModel.findByIdAndUpdate(id, user, { new: true });
    if(!updateUser)return null
    return updateUser

    
    
}


  }
  