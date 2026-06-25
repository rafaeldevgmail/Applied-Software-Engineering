console.log("[Worker] Iniciando o Worker de Relatórios...");
import { Worker } from "bullmq";
import { redisConfig } from "../config/redisConfig.ts";
import { ReportService } from "../services/reportService.ts"; // Importa o Service
console.log(
  `[Worker] Conectando ao Redis em ${redisConfig.host}:${redisConfig.port}...`,
);

const reportService = new ReportService();
export const reportWorker = new Worker(
  "relatorios-queue",
  async (job) => {
    const { taskId, userId } = job.data;

    console.log(
      `\n[Job ${job.id}] ⏳ Worker interceptou a fila. Repassando para o Service...`,
    );

    // ⚡ DELEGA A RESPONSABILIDADE PARA O SERVICE!
    await reportService.processGeneratedData(taskId, userId, job.id);

    console.log(`[Job ${job.id}] ✅ Service terminou o processamento!`);
  },
  { connection: redisConfig },
);

reportWorker.on("failed", (job, err) => {
  console.error(`[Job ${job.id}] ❌ Falhou:`, err.message);
});

reportWorker.on("completed", (job) => {
  console.log(`[Job ${job.id}] ✅ Completado!`);
});
