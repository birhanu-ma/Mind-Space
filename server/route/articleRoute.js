import express from "express";
import { protect, restrictTo } from "../controller/authController.js";
import {
  createArticle,
  deleteArticle,
  getAllArticles,
  getArticlesByType,
  updateArticle,
  getArticleDetails,
  reviewArticles
} from "../controller/articleController.js";
const router = express.Router();

router
  .route("/")
  .post(protect, restrictTo("counselor", "admin"), createArticle)
  .get(protect, getAllArticles)
  .patch(protect, restrictTo("counselor", "admin"), updateArticle)
  .delete(protect, restrictTo("admin"), deleteArticle);

router.route("/by-type").get(protect, getArticlesByType);
router
  .route("/:id")
  .get(protect, restrictTo("admin","mentee","counselor"), getArticleDetails)
  .patch(protect, restrictTo("admin"), reviewArticles);

export default router;
