"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_di_1 = require("../dependency injection/user_di");
const jwt_1 = require("../../configs/jwt");
const jwtauthentication_1 = require("../middlewares/jwtauthentication");
// import { authenticateAccessToken, authorizeRoles } from "../middlewares/jwtauthentication";
const router = express_1.default.Router();
router.post('/refresh-token', (req, res) => {
    (0, jwt_1.createAccesstoken)(req, res, "user");
});
router.post('/signup', (req, res, next) => {
    user_di_1.usercontroller.register(req, res, next);
});
router.post('/login', (req, res, next) => {
    user_di_1.usercontroller.login(req, res, next);
});
router.post('/logout/:id', (req, res, next) => {
    console.log("logout");
    user_di_1.usercontroller.logout(req, res, next);
});
router.get('/tasks/:id', jwtauthentication_1.authenticateAccessToken, (req, res, next) => {
    user_di_1.usercontroller._getTasksbyUserId(req, res, next);
});
router.patch('/tasks/:taskId/update-status', jwtauthentication_1.authenticateAccessToken, (req, res, next) => {
    user_di_1.usercontroller._patchTaskComplete(req, res, next);
});
router.put('/edit/:id', jwtauthentication_1.authenticateAccessToken, // validate JWT
(req, res, next) => {
    user_di_1.usercontroller._edituser(req, res, next);
});
exports.default = router;
