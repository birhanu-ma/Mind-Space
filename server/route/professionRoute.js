import express from "express";
import { protect, restrictTo } from "../controller/authController.js";
import { getProfessionsByType,updateProfession, getAllProfessions, getProfessionDetails } from "..//controller/professionController.js";

const router = express.Router();
router
  .route("/")
  .get(protect, getAllProfessions)
  .patch(protect, restrictTo( "admin"), updateProfession)

router.route("/by-type").get(protect, getProfessionsByType);

router
  .route("/:id")
  .get(protect, restrictTo("admin"), getProfessionDetails)

export default router;
