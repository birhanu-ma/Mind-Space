import express from "express";
import { protect, restrictTo } from "../controller/authController.js";
import {
  uploadServiceImage,
  processAndSaveServiceImage,
  addOrUpdateServiceImage,
} from "../controller/serviceImageController.js";
import {
  getServicesByType,
  createService,
  updateService,
  deleteService,
  getAllServices,
  getServiceDetails,
  reviewServices,
} from "../controller/serviceController.js";

const router = express.Router();

/**
 * CREATE & GET ALL SERVICES
 */
router
  .route("/")
  .post(
    protect,
    restrictTo("admin"),
    uploadServiceImage,
    processAndSaveServiceImage,
    createService
  )
  .get(protect, getAllServices);

/**
 * GET / UPDATE / DELETE SINGLE SERVICE
 */
router.route("/by-type").get(protect, getServicesByType);
router
  .route("/:id")
  .get(protect, restrictTo("admin"), getServiceDetails)
  .patch(protect, restrictTo("admin"), updateService)
  .delete(protect, restrictTo("admin"), deleteService);

/**
 * UPDATE SERVICE IMAGE
 */
router
  .route("/:id/image")
  .patch(
    protect,
    restrictTo("admin"),
    uploadServiceImage,
    processAndSaveServiceImage,
    addOrUpdateServiceImage
  );

/**
 * REVIEW SERVICE
 */
// ✅ STATIC ROUTES FIRST

// ✅ DYNAMIC ROUTES LAST
router
  .route("/:id")
  .get(protect, restrictTo("admin"), getServiceDetails)
  .patch(protect, restrictTo("admin"), reviewServices);

export default router;
