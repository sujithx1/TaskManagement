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
exports.PatchUpdateTaskuserSide_useCase = void 0;
const apperror_1 = require("../../../configs/apperror");
const errorcodes_1 = require("../../../configs/errorcodes");
class PatchUpdateTaskuserSide_useCase {
    constructor(taskrepo) {
        this.taskrepo = taskrepo;
    }
    execute(taskId, userId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const task = yield this.taskrepo.findById(taskId);
            if (!task)
                throw new apperror_1.AppError(errorcodes_1.ErrorCodes.Resourse_not_found, 400);
            const update = yield this.taskrepo.findTaskandUpdateAssignId(taskId, userId, status);
            if (!update)
                throw new apperror_1.AppError(errorcodes_1.ErrorCodes.Server_errors, 500);
            return update;
        });
    }
}
exports.PatchUpdateTaskuserSide_useCase = PatchUpdateTaskuserSide_useCase;
