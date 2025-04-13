import { NextFunction, Request, Response } from "express";
import { User_signupuseCase } from "../../../application/use-cases/userside/signupuseCase";
import { LoginuseCase_user } from "../../../application/use-cases/userside/loginuseCase";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../configs/jwt";
import { GetUserById_useCase } from "../../../application/use-cases/userside/finuserbyId";
import { AppError } from "../../../configs/apperror";
import { ErrorCodes } from "../../../configs/errorcodes";
import { EditUser_useCase } from "../../../application/use-cases/userside/edituser";
import { GetTaskUserSide_useCase } from "../../../application/use-cases/userside/findtask";
import { PatchUpdateTaskuserSide_useCase } from "../../../application/use-cases/userside/patchupdateTask";

export class Usercontroller {
  constructor(
    private usersignup: User_signupuseCase,
    private userlogin: LoginuseCase_user,
    private finduser: GetUserById_useCase,
    private updateUser: EditUser_useCase,
    private findTask: GetTaskUserSide_useCase,
    private patchUpdateTask:PatchUpdateTaskuserSide_useCase
  ) {}

  async register(req: Request, res: Response, next: NextFunction) {
    const { name, email, password, phone } = req.body;
    try {
      if (!name || !email || !password || !phone)
        return next(new AppError(ErrorCodes.ValidationError, 404));
      const user = await this.usersignup.registerUser(
        name,
        email,
        password,
        phone
      );
      const { password: _, ...rest } = user;

      res.status(201).json({ message: "User created", user: rest });
    } catch (err) {
      next(err);
    }
  }
  async login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
      if (!email || !password)
        return next(new AppError(ErrorCodes.ValidationError, 404));
      const user = await this.userlogin.execute(email, password);
      let role = "user";
      if (user.isAdmin) role = "admin";
      const accessToken = generateAccessToken(user.id, role);
      const refreshToken = generateRefreshToken(user.id, role);

      const { password: _, ...rest } = user;
      console.log("user", rest);

      res
        .cookie(`${role}_refreshToken`, refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .status(200)
        .json({ message: "User logged", user: rest, accessToken });
    } catch (err) {
      next(err);
    }
  }
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      console.log(id);

      if (!id) return next(new AppError(ErrorCodes.Id_Missing, 404));
      const user = await this.finduser.execute(id);

      let role = "user";
      if (user.isAdmin) role = "admin";

      res
        .clearCookie(`${role}_refreshToken`, {
          httpOnly: true,
          sameSite: "strict",
        })
        .status(200)
        .json({ success: true, message: "User logout success" });
    } catch (err) {
      next(err);
    }
  }
  async _edituser(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, phone, prifile_image } = req.body;

      const { id } = req.params;
      if (!id) return next(new AppError(ErrorCodes.Id_Missing, 404));

      const user = await this.updateUser.execute(
        id,
        name,
        phone,
        prifile_image
      );
      const { password: _, ...rest } = user;
      return res.status(200).json({ message: "success", user: rest });
    } catch (err) {
      return next(err);
    }
  }
 
  async _getTasksbyUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      if (!id) return next(new AppError(ErrorCodes.Id_Missing, 404));
      const tasks = await this.findTask.execute(id);
      return res.status(200).json({ message: "success", tasks });
    } catch (err) {
      return next(err);
    }
  }
  async _patchTaskComplete(req: Request, res: Response, next: NextFunction) {
    try {
      const { taskId } = req.params;
      const { userId, status } = req.body;
      if (!taskId) return next(new AppError(ErrorCodes.Id_Missing, 404));
      if (!userId||!status) return next(new AppError(ErrorCodes.ValidationError, 404));


      const tasks = await this.patchUpdateTask.execute(taskId,userId,status);
      return res.status(200).json({ message: "success", tasks });
    } catch (err) {
      return next(err);
    }
  }
}
