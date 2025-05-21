import { hashfn } from "../../configs/hashpassfn";
import { userEntity } from "../../domain/entities/userentity";
import { CreateUserRequestDTO, UserResponseDto } from "../userDto";

export class UserMap {
  static async toEntity(dto: CreateUserRequestDTO): Promise<userEntity> {
    const hashedPassword = await hashfn(dto.password);
    return {
      id: "",  
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      password: hashedPassword,
    };
  }

  static toResponse(user: userEntity): UserResponseDto {
    console.log(user);
    
    return {
      id: user.id,
      _id:user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin:user.isAdmin,
      isBlock:user.isBlock,
    
    };
  }
}
