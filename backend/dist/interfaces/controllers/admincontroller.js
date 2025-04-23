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
exports.Admincontroller = void 0;
const apperror_1 = require("../../configs/apperror");
const errorcodes_1 = require("../../configs/errorcodes");
class Admincontroller {
    constructor(getusers, createTask, getTasks, updateTask, taskremoveuser) {
        this.getusers = getusers;
        this.createTask = createTask;
        this.getTasks = getTasks;
        this.updateTask = updateTask;
        this.taskremoveuser = taskremoveuser;
    }
    _getusers(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.getusers.execute();
                res.status(200).json({ message: "success get users", users });
            }
            catch (err) {
                return next(err);
            }
        });
    }
    ;
    _createnewtask(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, dueDate, priority, assignedTo, checklist, attachments } = req.body;
            try {
                if (!title ||
                    !description ||
                    !dueDate ||
                    !priority ||
                    !assignedTo ||
                    !checklist)
                    return next(new apperror_1.AppError(errorcodes_1.ErrorCodes.ValidationError, 404));
                const task = yield this.createTask.execute({ title,
                    description,
                    dueDate,
                    priority,
                    assignedTo,
                    checklist,
                });
                res.status(200).json({ success: true, message: "User created", task });
            }
            catch (err) {
                return next(err);
            }
        });
    }
    ;
    _gettasks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tasks = yield this.getTasks.execute();
                res.status(200).json({ success: true, message: "User created", tasks });
            }
            catch (err) {
                return next(err);
            }
        });
    }
    ;
    _updateTasks(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, description, dueDate, priority, assignedTo, checklist, } = req.body;
                if (!title ||
                    !description ||
                    !dueDate ||
                    !priority ||
                    !assignedTo ||
                    !checklist)
                    return next(new apperror_1.AppError(errorcodes_1.ErrorCodes.ValidationError, 404));
                const { id } = req.params;
                if (!id)
                    return next(new apperror_1.AppError(errorcodes_1.ErrorCodes.Id_Missing, 404));
                const task = yield this.updateTask.execute({ id, title,
                    description,
                    dueDate,
                    priority,
                    assignedTo,
                    checklist,
                });
                res.status(200).json({ success: true, message: "User created", task });
            }
            catch (err) {
                return next(err);
            }
        });
    }
    ;
    _removeTaskuser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.body;
                if (!userId)
                    return next(new apperror_1.AppError(errorcodes_1.ErrorCodes.ValidationError, 404));
                const { id } = req.params;
                if (!id)
                    return next(new apperror_1.AppError(errorcodes_1.ErrorCodes.Id_Missing, 404));
                const task = yield this.taskremoveuser.execute(id, userId);
                res.status(200).json({ success: true, message: "User created", task });
            }
            catch (err) {
                return next(err);
            }
        });
    }
    ;
}
exports.Admincontroller = Admincontroller;
