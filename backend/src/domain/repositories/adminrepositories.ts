import { TaskEntity, TaskInput } from "../entities/taskentity";
import { userEntity } from "../entities/userentity";

export interface IAdminRepositories {
    getAllUsers(): Promise<userEntity[]>;
    getUserById(id: string): Promise<userEntity | null>;
    getTaskById(id: string): Promise<TaskEntity | null>;
    createTask(task: TaskInput): Promise<TaskEntity>;
    getAllTasks(): Promise<TaskEntity[]>;
    updateTask(taskId: string, updates: TaskEntity): Promise<TaskEntity|null>;
    deleteTask(taskId: string): Promise<void>;
  }
  

  