import express from "express";
import { login, signUp, logout } from "../controller/authController.js";
const router = express.Router();

router.post("/sign-up", signUp);
router.post("/login", login);
router.post("/logout", logout);
export default router;
