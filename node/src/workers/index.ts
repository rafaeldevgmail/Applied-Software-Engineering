import "../config/env.ts";

// Importa todos os workers do sistema
// import "./emailWorker.js";
import "./reportWorker.ts";

console.log(
  "🏃 [Workers] Todos os processos de segundo plano foram iniciados!",
);
