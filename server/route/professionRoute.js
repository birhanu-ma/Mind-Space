import express from "express";
import { protect, restrictTo } from "../controller/authController.js";
import { getProfessionsByType,createProfession,updateProfession,deleteProfession, getAllProfessions } from "..//controller/professionController.js";

const router = express.Router();


router
  .route("/")
  .post(protect, restrictTo( "admin"), createProfession)
  .get(protect, getAllProfessions)
  .patch(protect, restrictTo( "admin"), updateProfession)
  .delete(protect, restrictTo("admin"), deleteProfession);

router.route("/by-type").get(protect, getProfessionsByType);

export default router;
