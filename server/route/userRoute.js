import express from "express";
import { protect, restrictTo } from "../controller/authController.js";
import { getUsersByRole, getAllUsers, getUserDetails, reviewUser } from "../controller/usersController.js";
const router = express.Router();

router.route("/").get(protect, restrictTo("admin"), getAllUsers);

router.get(
  "/by-role",
  protect,
  restrictTo("student-union", "mentor", "admin"),
  getUsersByRole
);

router
  .route("/:id")
  .get(protect, restrictTo("admin"), getUserDetails)
  .patch(protect, restrictTo("admin"), reviewUser);
export default router;
