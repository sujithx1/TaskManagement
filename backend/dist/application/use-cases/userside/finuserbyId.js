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
exports.GetUserById_useCase = void 0;
const apperror_1 = require("../../../configs/apperror");
class GetUserById_useCase {
    constructor(userRep) {
        this.userRep = userRep;
    }
    execute(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRep.findById(id);
            if (!user)
                throw new apperror_1.AppError('user not found');
            return user;
        });
    }
}
exports.GetUserById_useCase = GetUserById_useCase;
