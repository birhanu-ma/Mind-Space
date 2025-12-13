import express from "express";
import { protect, restrictTo } from "../controller/authController.js";
import { getServicesByType,createService,updateService,deleteService, getAllServices,getServiceDetails, reviewServices } from "../controller/serviceController.js";

const router = express.Router();


router
  .route("/")
  .post(protect, restrictTo( "admin"), createService)
  .get(protect, getAllServices)
  .patch(protect, restrictTo( "admin"), updateService)
  .delete(protect, restrictTo("admin"), deleteService);

router.route("/by-type").get(protect, getServicesByType);
router
  .route("/:id")
  .get(protect, restrictTo("admin"), getServiceDetails)
  .patch(protect, restrictTo("admin"), reviewServices);
export default router;
