import express from "express";
import { protect, restrictTo } from "../controller/authController.js";
import {
  createCounseling,
  deleteCounseling,
  getCounseling,
  
} from "../controller/counselingController.js";
const router = express.Router();

router
  .route("/")
  .post(protect, restrictTo("admin"), createCounseling)
  .get(protect, restrictTo("mentee", "counselor", "admin"), getCounseling)

  .delete(protect, restrictTo("admin"), deleteCounseling);

export default router;
