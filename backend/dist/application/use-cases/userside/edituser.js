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
exports.EditUser_useCase = void 0;
const apperror_1 = require("../../../configs/apperror");
const errorcodes_1 = require("../../../configs/errorcodes");
class EditUser_useCase {
    constructor(userRep) {
        this.userRep = userRep;
    }
    execute(id, name, phone, prifile_image) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRep.findById(id);
            if (!user)
                throw new apperror_1.AppError(errorcodes_1.ErrorCodes.user_not_found, 400);
            user.name = name,
                user.phone = phone;
            if (prifile_image) {
                user.prifile_image = prifile_image;
            }
            const update = yield this.userRep.update(user.id, user);
            if (!update)
                throw new apperror_1.AppError(errorcodes_1.ErrorCodes.Server_errors, 500);
            return update;
        });
    }
}
exports.EditUser_useCase = EditUser_useCase;
