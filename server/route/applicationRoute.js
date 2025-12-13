import express from "express";
import { protect, restrictTo } from "../controller/authController.js";
import { getApplicationsByType,getMenteeDetail,createApplication,updateApplication,deleteApplication, getAllApplications,getApplicationDetails, reviewApplications,createMenteeApplication, updateMenteeApplication, deleteMenteeApplication } from "..//controller/ApplicationController.js";

const router = express.Router();


router
  .route("/counselor")
  .post(protect, restrictTo("counselor"), createApplication)
  .get(protect, getAllApplications)
  .patch(protect, restrictTo( "admin"), updateApplication)
  .delete(protect, restrictTo("admin"), deleteApplication);


  
router
  .route("/mentee")
  .post(protect, restrictTo( "admin","mentee"), createMenteeApplication)
  .get(protect, getAllApplications)
  .patch(protect, restrictTo( "admin"), updateMenteeApplication)
  .delete(protect, restrictTo("admin"), deleteMenteeApplication);

router.route("/by-type").get(protect, getApplicationsByType);

router
  .route("/counselor/:id")
  .get(protect, restrictTo("admin"), getApplicationDetails)
  .patch(protect, restrictTo("admin"), reviewApplications);

router
  .route("/mentees/:id")
  .get(protect, restrictTo("admin"), getMenteeDetail)
  .patch(protect, restrictTo("admin"), reviewApplications);

  


export default router;
