import express from "express";
import { protect, restrictTo } from "../controller/authController.js";
import {
  createArticle,
  deleteArticle,
  getAllArticles,
  getArticlesByType,
  updateArticle,
} from "../controller/articleController.js";
const router = express.Router();

router
  .route("/")
  .post(protect, restrictTo("counselor", "admin"), createArticle)
  .get(protect, getAllArticles)
  .patch(protect, restrictTo("counselor", "admin"), updateArticle)
  .delete(protect, restrictTo("admin"), deleteArticle);

router.route("/by-type").get(protect, getArticlesByType);

export default router;
