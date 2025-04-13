import { userEntity } from "../entities/userentity";

export interface IuserRepo{
    create(user: userEntity): Promise<userEntity>;
  findByEmail(email: string): Promise<userEntity | null>;
  findById(id:string):Promise<userEntity|null>
  update(id:string,user:userEntity):Promise<userEntity|null>
}