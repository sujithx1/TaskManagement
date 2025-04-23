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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginuseCase_user = void 0;
const apperror_1 = require("../../../configs/apperror");
const errorcodes_1 = require("../../../configs/errorcodes");
const bcrypt_1 = __importDefault(require("bcrypt"));
class LoginuseCase_user {
    constructor(userrep) {
        this.userrep = userrep;
    }
    execute(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userrep.findByEmail(email);
            if (!user)
                throw new apperror_1.AppError(errorcodes_1.ErrorCodes.user_not_found, 400);
            const comparepass = yield bcrypt_1.default.compare(password, user.password);
            if (!comparepass)
                throw new apperror_1.AppError(errorcodes_1.ErrorCodes.password_match, 400);
            return user;
        });
    }
}
exports.LoginuseCase_user = LoginuseCase_user;
