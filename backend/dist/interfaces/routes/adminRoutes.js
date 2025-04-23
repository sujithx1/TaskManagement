"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt_1 = require("../../configs/jwt");
const admin_di_1 = require("../dependency injection/admin_di");
const jwtauthentication_1 = require("../middlewares/jwtauthentication");
// import { Authentication } from "../middlewares/jwtauthentication";
const router = express_1.default.Router();
router.post("/refresh-token", (req, res) => {
    (0, jwt_1.createAccesstoken)(req, res, "admin");
});
router.get("/users", jwtauthentication_1.authenticateAccessToken, (req, res, next) => {
    admin_di_1.admincontroller._getusers(req, res, next);
});
router.post("/task", jwtauthentication_1.authenticateAccessToken, (req, res, next) => {
    admin_di_1.admincontroller._createnewtask(req, res, next);
});
router.get("/tasks", jwtauthentication_1.authenticateAccessToken, (req, res, next) => {
    admin_di_1.admincontroller._gettasks(req, res, next);
});
router.put("/task/:id", jwtauthentication_1.authenticateAccessToken, (req, res, next) => {
    admin_di_1.admincontroller._updateTasks(req, res, next);
});
router.patch("/task-remove-userid/:id", jwtauthentication_1.authenticateAccessToken, (req, res, next) => {
    admin_di_1.admincontroller._removeTaskuser(req, res, next);
});
exports.default = router;
