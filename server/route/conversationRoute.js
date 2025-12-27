import express from "express";
import { protect, restrictTo } from "../controller/authController.js";
import { getConversation } from "../controller/chat/conversationController.js";
const router = express.Router();

router
  .route("/:roomId/group-chats")
  .get(protect, restrictTo("counselor", "mentee"), getConversation);

export default router;
