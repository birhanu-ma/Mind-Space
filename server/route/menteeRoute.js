import express from "express";
import { protect, restrictTo } from "../controller/authController.js";
import {
  createMenteeApplication,
  updateMenteeApplication,
  deleteMenteeApplication,
  getMenteeDetail,
  reviewMenteeApplication
} from "../controller/menteeController.js";

const router = express.Router();

// CRUD for mentee applications
router
  .route("/")
  .post(protect, restrictTo("admin", "mentee"), createMenteeApplication)
  .patch(protect, restrictTo("admin"), updateMenteeApplication)
  .delete(protect, restrictTo("admin"), deleteMenteeApplication);

// Get & review individual mentee application
router
  .route("/:id")
  .get(protect, restrictTo("admin"), getMenteeDetail)
  .patch(protect, restrictTo("admin"), reviewMenteeApplication);

export default router;
