import express from "express";
import { protect, restrictTo } from "../controller/authController.js";
import {
  createApplication,
  getAllApplications,
  getApplication,
  updateApplication,
  deleteApplication,
  reviewApplications,
  getApplicationsByType
} from "../controller/counselorController.js";

const router = express.Router();

// CRUD for counselor applications
router
  .route("/")
  .post(protect, restrictTo("user"), createApplication)
  .get(protect, restrictTo("admin"), getAllApplications)
  .patch(protect, restrictTo("admin"), updateApplication)
  .delete(protect, restrictTo("admin"), deleteApplication);

// Get by type
router.route("/by-type").get(protect, getApplicationsByType);

// Get & review individual application
router
  .route("/:id")
  .get(protect, restrictTo("admin"), getApplication)
  .patch(protect, restrictTo("admin"), reviewApplications);

export default router;
