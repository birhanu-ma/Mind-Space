import express from "express";
import { protect, restrictTo } from "../controller/authController.js";
import {
  createArticle,
  deleteArticle,
  getArticle,
  updateArticle,
} from "../controller/articleController.js";
const router = express.Router();

router
  .route("/")
  .post(protect, restrictTo("counselor", "admin"), createArticle)
  .get(protect, getArticle)
  .patch(protect, restrictTo("counselor", "admin"), updateArticle)
  .delete(protect, restrictTo("admin"), deleteArticle);

export default router;
