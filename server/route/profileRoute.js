import express from "express";
import { protect, restrictTo } from "../controller/authController.js";
import { getMe, updateMyDetails } from "../controller/profileController.js";
import {
  addOrUpdatePhoto,
  uploadUserPhoto,
  processAndSaveProfilePhoto,
} from "../controller/profilePhotoController.js";

const router = express.Router();

// Update profile photo
// Get & update current user profile
router
  .route("/me")
  .get(protect, restrictTo("admin", "mentee", "counselor", "user"), getMe)
  .patch(
    protect,
    restrictTo("admin", "mentee", "counselor", "user"),
    updateMyDetails
  );

router.patch(
  "/me/photo",
  protect,
  restrictTo("admin", "mentee", "counselor", "user"),
  uploadUserPhoto,
  processAndSaveProfilePhoto,
  addOrUpdatePhoto
);

export default router;
