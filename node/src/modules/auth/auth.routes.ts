import express from "express";
import { authController } from "@/factories/user-factory.ts";

const router = express.Router();

router.post("/login", authController.login);
router.post("/register", authController.registerStart);
router.post("/register-complete", authController.registerComplete);
router.post("/resend-register-token", authController.resendRegisterToken);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

export default router;
