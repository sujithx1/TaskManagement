import { AppError } from "../../../configs/apperror";
import { ErrorCodes } from "../../../configs/errorcodes";
import { IuserRepo } from "../../../domain/repositories/userRepo";
import { UserMap } from "../../../dto/mapper/userMap";
import { UserResponseDto } from "../../../dto/userDto";

export class EditUser_useCase {
  constructor(private userRep: IuserRepo) {}

  async execute(
    id: string,
    name: string,
    phone: string,
  ): Promise<UserResponseDto> {
    const user = await this.userRep.findById(id);
    if (!user) throw new AppError(ErrorCodes.user_not_found, 400);
    (user.name = name), (user.phone = phone);
  

    const update = await this.userRep.update(user.id, user);

    if (!update) throw new AppError(ErrorCodes.Server_errors, 500);
    return UserMap.toResponse(update);
  }
}
