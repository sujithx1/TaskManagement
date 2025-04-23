"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Taskmongorepositories = exports.returnTaskEntity = void 0;
const taskmodel_1 = require("../../database/taskmodel");
const returnTaskEntity = (task) => {
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
exports.returnTaskEntity = returnTaskEntity;
class Taskmongorepositories {
    findByassignId(assignId) {
        return __awaiter(this, void 0, void 0, function* () {
            const tasks = yield taskmodel_1.TaskModel.find({
                "assignedTo.userId": assignId,
            }).populate("assignedTo.userId");
            return tasks.map((item) => (0, exports.returnTaskEntity)(item));
        });
    }
    findById(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield taskmodel_1.TaskModel.findById(taskId);
            if (!task)
                return null;
            return (0, exports.returnTaskEntity)(task);
        });
    }
    findTaskandUpdateAssignId(taskId, assignId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            yield taskmodel_1.TaskModel.findOneAndUpdate({
                _id: taskId,
                "assignedTo.userId": assignId,
            }, {
                $set: {
                    "assignedTo.$.status": status,
                },
            }, { upsert: true, new: true });
            const updateTask = yield taskmodel_1.TaskModel.findById(taskId);
            if (!updateTask)
                return null;
            const allcompleted = updateTask.assignedTo.every((assignee) => assignee.status === "Completed");
            if (allcompleted && updateTask.status !== "Completed") {
                updateTask.status = "Completed";
                yield updateTask.save();
            }
            return (0, exports.returnTaskEntity)(updateTask);
        });
    }
    // removeTaskusers(taskId: string, userId: string): Promise<TaskEntity | null> {
    //     const task=await TaskModel.findOneAndUpdate({_id:taskId},{
    //     })
    // }
    findTaskandDelete(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield taskmodel_1.TaskModel.findOneAndDelete({ _id: taskId });
        });
    }
}
exports.Taskmongorepositories = Taskmongorepositories;
