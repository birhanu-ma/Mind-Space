import express from "express";
import { protect, restrictTo } from "../controller/authController.js";
import {
  createMessage,
  deleteMessage,
  getAllMessage,
  getMessage,
} from "../controller/messageController.js";
const router = express.Router();

router
  .route("/")
  .get(protect, restrictTo("admin"), getAllMessage)
  .post(protect, restrictTo("counselor", "mentee", "user"), createMessage);

router
  .route("/:id")
  .get(protect, restrictTo("admin", "mentee", "user","counselor"), getMessage)
  .delete(protect, restrictTo("admin", "mentee", "user","counselor"), deleteMessage);

export default router;
