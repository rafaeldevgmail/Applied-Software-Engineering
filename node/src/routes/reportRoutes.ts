import { Router } from "express";
import { ReportController } from "../controllers/reportController.ts";
// import { authMiddleware } from '../middlewares/authMiddleware.ts';

const router = Router();
const reportController = new ReportController();

// No caso de validar um token JWT do usuário logado
// router.post('/relatorio', authMiddleware, reportController.create);
router.post("/relatorio", reportController.create);

export default router;
