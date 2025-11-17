import express from "express";
import { protect, restrictTo } from "../controller/authController.js";
import {
  createPetition,
  deletePetition,
  getAllPetitions,
  updatePetition,
} from "../controller/petitionController.js";
const router = express.Router();

router
  .route("/")
  .post(protect, restrictTo("mentee", "counselor"), createPetition)
  .get(protect, restrictTo("mentee", "counselor", "admin"), getAllPetitions)
  .patch(protect, restrictTo("admin"), updatePetition)
  .delete(protect, restrictTo("admin"), deletePetition);

export default router;
