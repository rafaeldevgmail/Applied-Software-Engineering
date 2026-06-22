import { ReportService } from '../services/reportService.js';

const reportService = new ReportService();

export class ReportController {
  async create(req, res) {
    try {
      // Fingindo que pegamos o ID do usuário autenticado pelo token JWT
      const userId = 1; 
      
      const taskId = await reportService.triggerReportGeneration(userId);

      return res.status(202).json({
        message: 'Solicitação aceita! Processando em segundo plano.',
        taskId
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}