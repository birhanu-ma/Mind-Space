import express from "express";
import { protect, restrictTo } from "../controller/authController.js";
import { createMessage, deleteMessage, getAllMessage, getMessage } from "../controller/messageController.js";
const router = express.Router();

router
  .route("/")
  .get(protect, restrictTo("admin"), getAllMessage)
  .post(protect, restrictTo("counselor","mentee","user"), createMessage)

router
  .route("/:id")
  .get(protect, restrictTo("admin"), getMessage)
  .delete(protect, restrictTo("admin"), deleteMessage)

export default router
