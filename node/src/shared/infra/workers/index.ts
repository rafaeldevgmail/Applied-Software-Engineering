import "@/config/env.ts";

// Importa todos os workers do sistema
// import "@/workers/emailWorker.js";
import "@/modules/reports/report.worker.ts";

console.log(
  "🏃 [Workers] Todos os processos de segundo plano foram iniciados!",
);
