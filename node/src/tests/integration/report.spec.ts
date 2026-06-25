import { describe, it, expect } from "vitest";
import { ReportService } from "../../services/reportService.ts";

describe("Fila de Relatórios (Integração)", () => {
  it("deve conseguir criar uma tarefa e mandar pro Redis com sucesso", async () => {
    const reportService = new ReportService();
    const fakeUserId = 2;

    // Executa a função real
    const taskId = await reportService.triggerReportGeneration(fakeUserId);

    // Valida o resultado logicamente: Esperamos que o ID da tarefa retornado seja um número ou string válida
    expect(taskId).toBeDefined();
    expect(typeof taskId).toBe("number");
  });
});
