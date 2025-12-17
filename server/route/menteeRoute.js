import express from "express";
import { protect, restrictTo } from "../controller/authController.js";
import {
  createMenteeApplication,
  updateMenteeApplication,
  deleteMenteeApplication,
  getMentee,
  getAllApplications,
  reviewMenteeApplication
} from "../controller/menteeController.js";

const router = express.Router();

// CRUD for mentee applications
router
  .route("/")
   .get(protect, restrictTo("admin"), getAllApplications)
  .post(protect, restrictTo("user"), createMenteeApplication)
  .patch(protect, restrictTo("admin"), updateMenteeApplication)
  .delete(protect, restrictTo("admin"), deleteMenteeApplication);

// Get & review individual mentee application
router
  .route("/:id")
  .get(protect, restrictTo("admin"), getMentee)
  .patch(protect, restrictTo("admin"), reviewMenteeApplication);

export default router;
