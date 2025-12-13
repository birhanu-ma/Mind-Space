import express from "express";
import { protect, restrictTo } from "../controller/authController.js";
import {
  createPetition,
  deletePetition,
  getAllPetitions,
  updatePetition,
  getPetitionDetails,
  reviewPetitions
} from "../controller/petitionController.js";
const router = express.Router();

router
  .route("/")
  .post(protect, restrictTo("mentee", "counselor"), createPetition)
  .get(protect, restrictTo("mentee", "counselor", "admin"), getAllPetitions)
  .patch(protect, restrictTo("admin"), updatePetition)
  .delete(protect, restrictTo("admin"), deletePetition);

  router
  .route("/:id")
  .get(protect, restrictTo("admin"), getPetitionDetails)
  .patch(protect, restrictTo("admin"), reviewPetitions);



export default router;
