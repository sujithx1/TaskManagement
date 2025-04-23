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
exports.User_signupuseCase = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const apperror_1 = require("../../../configs/apperror");
class User_signupuseCase {
    constructor(userrep) {
        this.userrep = userrep;
    }
    registerUser(name, email, password, phone) {
        return __awaiter(this, void 0, void 0, function* () {
            const existing = yield this.userrep.findByEmail(email);
            if (existing)
                throw new apperror_1.AppError("User already exists", 400);
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            return this.userrep.create({ id: "", name, email, password: hashedPassword, phone, prifile_image: '' });
        });
    }
    ;
}
exports.User_signupuseCase = User_signupuseCase;
