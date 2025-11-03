import express from "express";
import { protect, restrictTo } from "../controller/authController.js";
import {
  createPetition,
  deletePetition,
  getPetition,
  updatePetition,
} from "../controller/petitionController.js";
const router = express.Router();

router
  .route("/")
  .post(protect, restrictTo("mentee", "counselor"), createPetition)
  .get(protect, restrictTo("mentee", "counselor", "admin"), getPetition)
  .patch(protect, restrictTo("admin"), updatePetition)
  .delete(protect, restrictTo("admin"), deletePetition);

export default router;
