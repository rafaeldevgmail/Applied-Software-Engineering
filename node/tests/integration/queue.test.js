import dotenv from "dotenv";
import { ReportService } from "../../services/reportService.js"; // 👈 Voltando duas pastas (../..)

// 1. Carrega as variáveis do .env (Banco e Redis)
dotenv.config();

async function runSandbox() {
  console.log("🚀 Iniciando script de teste isolado...");

  try {
    const reportService = new ReportService();

    // Simula o ID do usuário (ex: 1)
    const fakeUserId = 1;

    console.log(
      "🔄 Chamando o Service para criar a tarefa e jogar no Redis...",
    );
    const taskId = await reportService.triggerReportGeneration(fakeUserId);

    console.log(`\n======================================================`);
    console.log(`✅ SUCESSO!`);
    console.log(`ID da Tarefa criada no Postgres: ${taskId}`);
    console.log(`Verifique o terminal do Worker para ver o processamento!`);
    console.log(`======================================================`);
  } catch (error) {
    console.error("❌ Erro durante o teste do serviço:", error);
  } finally {
    // Fecha o processo após o teste
    process.exit(0);
  }
}

runSandbox();
