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
exports.Getusers_useCase = void 0;
class Getusers_useCase {
    constructor(adminrep) {
        this.adminrep = adminrep;
    }
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.adminrep.getAllUsers();
            return users;
        });
    }
}
exports.Getusers_useCase = Getusers_useCase;
