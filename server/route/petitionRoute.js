import express from "express";
import { protect, restrictTo } from "../controller/authController.js";
import {
  getPetition,
  getAllPetition,
  reviewPetition,
} from "../controller/adminController.js";
import { counselorCreatePetition } from "../controller/counselorController.js";
import { menteeCreatePetition } from "../controller/menteeController.js";

const router = express.Router();

// Mentee submits petition
router
  .route("/mentee")
  .post(protect, restrictTo("mentee"), menteeCreatePetition);

// Counselor submits petition
router
  .route("/counselor")
  .post(protect, restrictTo("counselor"), counselorCreatePetition);

// Admin: Get all petitions
router.route("/").get(protect, restrictTo("admin"), getAllPetition);

// Admin: Get ONE petition (for detail page)
router
  .route("/:id/review")
  .patch(protect, restrictTo("admin"), reviewPetition);
router.route("/:id").get(protect, restrictTo("admin"), getPetition);

// Admin: Approve or Reject (PATCH)

export default router;
