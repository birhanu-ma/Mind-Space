import express from "express";
import { protect, restrictTo } from "../controller/authController.js";
import { getUsersByRole, getAllUsers } from "../controller/usersController.js";
const router = express.Router();

router.route("/").get(protect, restrictTo("admin"), getAllUsers);

router.get(
  "/by-role",
  protect,
  restrictTo("student-union", "mentor", "admin"),
  getUsersByRole
);

export default router;
