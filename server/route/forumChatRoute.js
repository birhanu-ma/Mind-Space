// routes/forumChatRoutes.js  (or chatRoutes.js)

import express from "express";
import { protect, restrictTo } from "../controller/authController.js"; // Only logged-in users
import { getForumChat } from "../controller/chat/conversationController.js";

const router = express.Router();

// Protect all forum chat routes — only logged-in users can view/send
router
  .route("/:forumId/chat-history")
  .get(protect, restrictTo("admin", "counselor", "mentee"), getForumChat);

export default router;
