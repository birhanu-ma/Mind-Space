import express from "express";
import { protect, restrictTo } from "../controller/authController.js";
import {
  createCounseling,
  deleteCounseling,
  getCounseling,
  getCounselorForMentee,
  getMenteesForCounselor,
  getCounselingStatsForCounselor
} from "..//controller/counselingController.js";
const router = express.Router();

router
  .route("/")
  .post(protect, restrictTo("admin"), createCounseling)
  .get(protect, restrictTo("mentee", "counselor", "admin"), getCounseling)
  .delete(protect, restrictTo("admin"), deleteCounseling);

router
  .route("/mentees/:menteeId/counselor")
  .get(protect, restrictTo("mentee"), getCounselorForMentee);

router
  .route("/counselors/:counselorId/mentees")
  .get(protect, restrictTo("counselor"), getMenteesForCounselor);

router
  .route("/counselors/:counselorId/mentees/stats")
  .get(protect, restrictTo("counselor"), getCounselingStatsForCounselor);

export default router;
