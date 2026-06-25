import { Prisma } from "@prisma/client";

export class PrismaErrorHandler {
  static format(error: unknown) {
    //violação de unique, erro de validação
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        type: "DatabaseError",
        code: error.code, // Ex: P2002 (Unique constraint)
        message: "Erro de restrição no banco de dados.",
        meta: error.meta, // Diz exatamente qual campo falhou
      };
    }
    //erro de validação de argumentos, campos inválidos, etc
    if (error instanceof Prisma.PrismaClientValidationError) {
      return {
        type: "ValidationError",
        message: "Dados inválidos enviados para o banco de dados.",
        // Limpa a string gigante tirando as quebras de linha e o caminho do arquivo
        details: error.message.replace(/\s+/g, " ").trim(),
      };
    }
    // Qualquer outro erro do ecossistema Prisma
    return {
      type: "DatabaseUnknownError",
      message: "Ocorreu um erro inesperado no banco de dados.",
    };
  }
}
