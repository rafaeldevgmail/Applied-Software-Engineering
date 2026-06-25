import { ReportService } from "../services/reportService.ts";
// import { errorMiddleware } from "../middlewares/errorMiddleware.ts";
import { Request, Response, NextFunction } from "express";
const reportService = new ReportService();

export class ReportController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      // Fingindo que pegamos o ID do usuário autenticado pelo token JWT
      const userId = 2;

      const taskId = await reportService.triggerReportGeneration(userId);

      return res.status(202).json({
        message: "Solicitação aceita! Processando em segundo plano.",
        taskId,
      });
    } catch (error) {
      next(error);
    }
  }
}
