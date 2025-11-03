import express from "express";
import { protect, restrictTo } from "../controller/authController.js";
import {
  createCounseling,
  deleteCounseling,
  getCounseling,
  updateCounseling,
} from "../controller/counsellingController.js";
const router = express.Router();

router
  .route("/")
  .post(protect, restrictTo("admin"), createCounseling)
  .get(protect, restrictTo("mentee", "counselor", "admin"), getCounseling)
  .patch(protect, restrictTo("admin"), updateCounseling)
  .delete(protect, restrictTo("admin"), deleteCounseling);

export default router;
