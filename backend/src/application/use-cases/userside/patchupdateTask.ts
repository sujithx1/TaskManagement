import { AppError } from "../../../configs/apperror";
import { ErrorCodes } from "../../../configs/errorcodes";
import { TaskEntity } from "../../../domain/entities/taskentity";
import { ItaskRepositories } from "../../../domain/repositories/taskrepo";

export class PatchUpdateTaskuserSide_useCase {
  constructor(private taskrepo: ItaskRepositories) {}

  async execute(
    taskId: string,
    userId: string,
    status: "Completed"
  ): Promise<TaskEntity> {
    const task = await this.taskrepo.findById(taskId);
    if (!task) throw new AppError(ErrorCodes.Resourse_not_found, 400);
    const update = await this.taskrepo.findTaskandUpdateAssignId(
      taskId,
      userId,
      status
    );
    if (!update) throw new AppError(ErrorCodes.Server_errors, 500);
    return update;
  }
}
