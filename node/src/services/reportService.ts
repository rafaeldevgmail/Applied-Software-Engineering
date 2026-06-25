import prisma from "../lib/prisma.ts";
import { reportQueue } from "../queues/reportQueue.ts";

export class ReportService {
  async triggerReportGeneration(userId: number) {
    // 1. Cria a intenção no Postgres de forma rápida
    const novaTarefa = await prisma.task.create({
      data: {
        userId,
        title: "Geração de PDF de Clientes Cadastrados",
        status: "todo",
        priority: "high",
      },
    });

    // 2. Manda para o Redis
    await reportQueue.add("gerar-pdf-clientes", {
      taskId: novaTarefa.id,
      userId,
    });

    return novaTarefa.id;
  }
  // ⬇️ O WORKER DAQUI A POUCO VAI CHAMAR ESSA FUNÇÃO AQUI:
  async processGeneratedData(taskId: number, userId: number, jobId: number) {
    // 1. Atualiza o status para em progresso
    await prisma.task.update({
      where: { id: taskId },
      data: {
        status: "in_progress",
        description: "Buscando dados e gerando PDF...",
      },
    });

    // 2. Busca os clientes no banco
    const clientes = await prisma.client.findMany({ where: { userId } });
    console.log(
      `[Job ${jobId}] Banco lido! Total de clientes: ${clientes.length}`,
    );

    // Simula o delay pesado
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // 3. Finaliza a tarefa no Postgres
    await prisma.task.update({
      where: { id: taskId },
      data: {
        status: "done",
        description: `Relatório gerado! Total de ${clientes.length} clientes processados.`,
      },
    });
  }
}
