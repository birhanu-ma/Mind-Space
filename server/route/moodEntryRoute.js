import express from "express";
import { protect, restrictTo } from "../controller/authController.js";
import { createMoodEntry, deleteMoodEntry, getAllMoodEntry } from "../controller/moodEntryController.js";
const router = express.Router();
router
  .route("/")
  .post(protect, restrictTo("counselor", "admin", "mentee", "user"), createMoodEntry)
  .get(protect, restrictTo("counselor", "admin", "mentee", "user"), getAllMoodEntry)
  .delete(protect, restrictTo("counselor", "admin", "mentee", "user"), deleteMoodEntry);
export default router
