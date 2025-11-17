import express from "express";
import { protect, restrictTo } from "../controller/authController.js";
import { getApplicationsByType,createApplication,updateApplication,deleteApplication, getAllApplications } from "..//controller/ApplicationController.js";

const router = express.Router();


router
  .route("/")
  .post(protect, restrictTo( "admin","counselor"), createApplication)
  .get(protect, getAllApplications)
  .patch(protect, restrictTo( "admin"), updateApplication)
  .delete(protect, restrictTo("admin"), deleteApplication);

router.route("/by-type").get(protect, getApplicationsByType);

export default router;
