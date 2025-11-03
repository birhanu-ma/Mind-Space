import express from "express";
import { login, signUp } from "../controller/authController.js";
const router = express.Router();

router.post("/sign-up", signUp);
router.post("/login", login);
export default router;
