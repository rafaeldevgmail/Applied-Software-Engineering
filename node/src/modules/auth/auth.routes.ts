import express from "express";
import { authController } from "@/factories/user-factory.ts";

const router = express.Router();

router.post("/login", authController.login);
router.post("/register", authController.registerStart);
router.post("/register-complete", authController.registerComplete);

export default router;
