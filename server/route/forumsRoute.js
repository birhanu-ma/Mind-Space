import express from "express";
import { protect, restrictTo } from "../controller/authController.js";
import { getForumsByType,createForum,updateForum,deleteForum, getAllForums, getForumDetails, reviewForums } from "../controller/forumController.js";

const router = express.Router();


router
  .route("/")
  .post(protect, restrictTo("counselor", "admin"), createForum)
  .get(protect, getAllForums)
  .patch(protect, restrictTo("counselor", "admin"), updateForum)
  .delete(protect, restrictTo("admin"), deleteForum);

router.route("/by-type").get(protect, getForumsByType);
router
  .route("/:id")
  .get(protect, restrictTo("admin","counselor","mentee"), getForumDetails)
  .patch(protect, restrictTo("admin","counselor","mentee"), reviewForums);
export default router;
