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
exports.AdminSideRepository = void 0;
const taskmodel_1 = require("../../database/taskmodel");
const usermodel_1 = require("../../database/usermodel");
const taskmongorep_1 = require("./taskmongorep");
class AdminSideRepository {
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return usermodel_1.userModel.find({ isAdmin: false });
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return usermodel_1.userModel.findById(id);
        });
    }
    createTask(task) {
        return __awaiter(this, void 0, void 0, function* () {
            const modifiedAssignedTo = (task.assignedTo || []).map(userId => ({
                userId,
                status: 'Pending',
            }));
            const newTask = new taskmodel_1.TaskModel(Object.assign(Object.assign({}, task), { assignedTo: modifiedAssignedTo }));
            const saved = yield newTask.save();
            return (0, taskmongorep_1.returnTaskEntity)(saved);
        });
    }
    getAllTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            const tasks = yield taskmodel_1.TaskModel.find().populate("assignedTo.userId");
            return tasks.map((item) => (0, taskmongorep_1.returnTaskEntity)(item));
        });
    }
    updateTask(taskId, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedTask = yield taskmodel_1.TaskModel.findByIdAndUpdate(taskId, updates, { new: true });
            if (!updatedTask)
                return null;
            return (0, taskmongorep_1.returnTaskEntity)(updatedTask);
        });
    }
    deleteTask(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield taskmodel_1.TaskModel.findByIdAndDelete(taskId);
        });
    }
    getTaskById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return taskmodel_1.TaskModel.findById(id);
        });
    }
}
exports.AdminSideRepository = AdminSideRepository;
