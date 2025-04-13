import { TaskEntity } from "../../../domain/entities/taskentity";
import { ItaskRepositories } from "../../../domain/repositories/taskrepo";
import { ITask, TaskModel } from "../../database/taskmodel";

export const returnTaskEntity = (task: ITask): TaskEntity => {
  return {
    id: task.id.toString(),
    title: task.title,
    description: task.description,
    dueDate: task.dueDate,
    priority: task.priority,
    assignedTo: task.assignedTo,
    checklist: task.checklist,
    // attachments: task.attachments,
    status: task.status,
  };
};

export class Taskmongorepositories implements ItaskRepositories {
  async findByassignId(assignId: string): Promise<TaskEntity[]> {
    const tasks = await TaskModel.find({
      "assignedTo.userId": assignId,
    }).populate("assignedTo.userId");
    return tasks.map((item) => returnTaskEntity(item));
  }

  async findById(taskId: string): Promise<TaskEntity | null> {
    const task = await TaskModel.findById(taskId);
    if (!task) return null;

    return returnTaskEntity(task);
  }

  async findTaskandUpdateAssignId(
    taskId: string,
    assignId: string,
    status: "Completed"
  ): Promise<TaskEntity | null> {
    await TaskModel.findOneAndUpdate(
      {
        _id: taskId,
        "assignedTo.userId": assignId,
      },
      {
        $set: {
          "assignedTo.$.status": status,
        },
      },
      { upsert: true, new: true }
    );

    const updateTask = await TaskModel.findById(taskId);
    if (!updateTask) return null;
    const allcompleted = updateTask.assignedTo.every(
      (assignee) => assignee.status === "Completed"
    );
    if (allcompleted && updateTask.status !== "Completed") {
      updateTask.status = "Completed";
      await updateTask.save();
    }
    return returnTaskEntity(updateTask);
  }
}
