import express from "express";
import { protect, restrictTo } from "../controller/authController.js";
import { getProfessionsByType,createProfession,updateProfession,deleteProfession, getAllProfessions, getProfessionDetails, reviewProfessions } from "..//controller/professionController.js";

const router = express.Router();


router
  .route("/")
  .post(protect, restrictTo( "admin"), createProfession)
  .get(protect, getAllProfessions)
  .patch(protect, restrictTo( "admin"), updateProfession)
  .delete(protect, restrictTo("admin"), deleteProfession);

router.route("/by-type").get(protect, getProfessionsByType);

router
  .route("/:id")
  .get(protect, restrictTo("admin"), getProfessionDetails)
  .patch(protect, restrictTo("admin"), reviewProfessions);

export default router;
