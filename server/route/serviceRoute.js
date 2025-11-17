import express from "express";
import { protect, restrictTo } from "../controller/authController.js";
import { getServicesByType,createService,updateService,deleteService, getAllServices } from "../controller/serviceController.js";

const router = express.Router();


router
  .route("/")
  .post(protect, restrictTo( "admin"), createService)
  .get(protect, getAllServices)
  .patch(protect, restrictTo( "admin"), updateService)
  .delete(protect, restrictTo("admin"), deleteService);

router.route("/by-type").get(protect, getServicesByType);

export default router;
