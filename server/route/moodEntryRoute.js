import express from "express";
import { protect, restrictTo } from "../controller/authController.js";
import { createMoodEntry, deleteMoodEntry, getAllMoodEntry, getMoodEntry } from "../controller/moodEntryController.js";
const router = express.Router();
router
  .route("/")
  .post(protect, restrictTo("counselor", "admin", "mentee", "user"), createMoodEntry)
  .get(protect, restrictTo("counselor", "admin", "mentee", "user"), getAllMoodEntry)

  router
  .route("/:id")
  .get(protect, restrictTo("counselor", "admin", "mentee", "user"), getMoodEntry)
  .delete(protect, restrictTo("counselor", "admin", "mentee", "user"), deleteMoodEntry);
export default router
