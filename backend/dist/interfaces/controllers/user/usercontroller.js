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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usercontroller = void 0;
const jwt_1 = require("../../../configs/jwt");
const apperror_1 = require("../../../configs/apperror");
const errorcodes_1 = require("../../../configs/errorcodes");
class Usercontroller {
    constructor(usersignup, userlogin, finduser, updateUser, findTask, patchUpdateTask) {
        this.usersignup = usersignup;
        this.userlogin = userlogin;
        this.finduser = finduser;
        this.updateUser = updateUser;
        this.findTask = findTask;
        this.patchUpdateTask = patchUpdateTask;
    }
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, phone } = req.body;
            try {
                if (!name || !email || !password || !phone)
                    return next(new apperror_1.AppError(errorcodes_1.ErrorCodes.ValidationError, 404));
                const user = yield this.usersignup.registerUser(name, email, password, phone);
                const { password: _ } = user, rest = __rest(user, ["password"]);
                res.status(201).json({ message: "User created", user: rest });
            }
            catch (err) {
                next(err);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                if (!email || !password)
                    return next(new apperror_1.AppError(errorcodes_1.ErrorCodes.ValidationError, 404));
                const user = yield this.userlogin.execute(email, password);
                let role = "user";
                if (user.isAdmin)
                    role = "admin";
                const accessToken = (0, jwt_1.generateAccessToken)(user.id, role);
                const refreshToken = (0, jwt_1.generateRefreshToken)(user.id, role);
                const { password: _ } = user, rest = __rest(user, ["password"]);
                console.log("user", rest);
                res
                    .cookie(`${role}_refreshToken`, refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict",
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                })
                    .status(200)
                    .json({ message: "User logged", user: rest, token: accessToken });
            }
            catch (err) {
                next(err);
            }
        });
    }
    logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                console.log(id);
                if (!id)
                    return next(new apperror_1.AppError(errorcodes_1.ErrorCodes.Id_Missing, 404));
                const user = yield this.finduser.execute(id);
                let role = "user";
                if (user.isAdmin)
                    role = "admin";
                res
                    .clearCookie(`${role}_refreshToken`, {
                    httpOnly: true,
                    sameSite: "strict",
                })
                    .status(200)
                    .json({ success: true, message: "User logout success" });
            }
            catch (err) {
                next(err);
            }
        });
    }
    _edituser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, phone, prifile_image } = req.body;
                const { id } = req.params;
                if (!id)
                    return next(new apperror_1.AppError(errorcodes_1.ErrorCodes.Id_Missing, 404));
                const user = yield this.updateUser.execute(id, name, phone, prifile_image);
                const { password: _ } = user, rest = __rest(user, ["password"]);
                return res.status(200).json({ message: "success", user: rest });
            }
            catch (err) {
                return next(err);
            }
        });
    }
    _getTasksbyUserId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id)
                    return next(new apperror_1.AppError(errorcodes_1.ErrorCodes.Id_Missing, 404));
                const tasks = yield this.findTask.execute(id);
                return res.status(200).json({ message: "success", tasks });
            }
            catch (err) {
                return next(err);
            }
        });
    }
    _patchTaskComplete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { taskId } = req.params;
                const { userId, status } = req.body;
                if (!taskId)
                    return next(new apperror_1.AppError(errorcodes_1.ErrorCodes.Id_Missing, 404));
                if (!userId || !status)
                    return next(new apperror_1.AppError(errorcodes_1.ErrorCodes.ValidationError, 404));
                const tasks = yield this.patchUpdateTask.execute(taskId, userId, status);
                return res.status(200).json({ message: "success", tasks });
            }
            catch (err) {
                return next(err);
            }
        });
    }
}
exports.Usercontroller = Usercontroller;
