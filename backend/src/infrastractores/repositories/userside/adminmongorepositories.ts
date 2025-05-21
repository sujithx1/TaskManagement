import { TaskEntity, TaskInput } from "../../../domain/entities/taskentity";
import { userEntity } from "../../../domain/entities/userentity";
import { IAdminRepositories } from "../../../domain/repositories/adminrepositories";
import { TaskModel } from "../../database/taskmodel";
import { userModel } from "../../database/usermodel";
import { returnTaskEntity } from "./taskmongorep";

export class AdminSideRepository implements IAdminRepositories {
  async getAllUsers(): Promise<userEntity[]> {
    return userModel.find({ isAdmin: false });
  }

  async getUserById(id: string): Promise<userEntity | null> {
    return userModel.findById(id);
  }

  async createTask(task: Partial<TaskInput>): Promise<TaskEntity> {
    const modifiedAssignedTo = (task.assignedTo || []).map((userId) => ({
      userId,
      status: "Pending",
    }));
    const newTask = new TaskModel({
      ...task,
      assignedTo: modifiedAssignedTo,
    });
    const saved = await newTask.save();
    return returnTaskEntity(saved);
  }

  async getAllTasks(): Promise<TaskEntity[]> {
    const tasks = await TaskModel.find().populate("assignedTo.userId");
    return tasks.map((item) => returnTaskEntity(item));
  }

  async updateTask(
    taskId: string,
    updates: TaskEntity
  ): Promise<TaskEntity | null> {
    const updatedTask = await TaskModel.findByIdAndUpdate(taskId, updates, {
      new: true,
    });
    if (!updatedTask) return null;
    return returnTaskEntity(updatedTask);
  }

  async deleteTask(taskId: string): Promise<void> {
    await TaskModel.findByIdAndDelete(taskId);
  }
  async getTaskById(id: string): Promise<TaskEntity | null> {
    const gettask = await TaskModel.findById(id);
    if (!gettask) return null;
    return returnTaskEntity(gettask);
  }
}
