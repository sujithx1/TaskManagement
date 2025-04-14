import express from "express";
import { createAccesstoken } from "../../configs/jwt";
import { admincontroller } from "../dependency injection/admin_di";
import { authenticateAccessToken } from "../middlewares/jwtauthentication";
// import { Authentication } from "../middlewares/jwtauthentication";
const router = express.Router();

router.post("/refresh-token", (req, res) => {
  createAccesstoken(req, res, "admin");
});

router.get("/users", authenticateAccessToken
    , (req, res, next) => {
admincontroller._getusers(req, res, next);
});
router.post(
  "/task",

  authenticateAccessToken,
  (req, res, next) => {
    admincontroller._createnewtask(req, res, next);
  }
);
router.get(
  "/tasks",

  authenticateAccessToken,
  (req, res, next) => {
    admincontroller._gettasks(req, res, next);
  }
);
router.put("/task/:id", authenticateAccessToken, (req, res, next) => {
  admincontroller._updateTasks(req, res, next);
});
router.patch("/task-remove-userid/:id", authenticateAccessToken, (req, res, next) => {
  admincontroller._removeTaskuser(req, res, next);
});

export default router;
