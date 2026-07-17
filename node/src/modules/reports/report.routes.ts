import { Router } from "express";
import { ReportController } from "@/modules/reports/report.controller.ts";
// import { authMiddleware } from '@/shared/middlewares/authMiddleware.ts';

const router = Router();
const reportController = new ReportController();

// No caso de validar um token JWT do usuário logado
// router.post('/relatorio', authMiddleware, reportController.create);
router.post("/relatorio", reportController.create);

export default router;
