import { Prisma } from "@prisma/client";

export class PrismaErrorHandler {
  static format(error: unknown) {
    //violação de unique, erro de validação
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      let statusCode = 400; // Padrão para Bad Request (ex: violação de unique)
      switch (error.code) {
        case "P2002":
          statusCode = 409; // Conflito (Conflict) para Unique Constraint Violation
          break;
        case "P2025":
          statusCode = 404; // Not Found
          break;
        default:
          statusCode = 400; // Bad Request para outros erros conhecidos
      }
      return {
        statusCode,
        body: {
          type: "DatabaseError",
          code: error.code,
          message: "Erro de restrição no banco de dados.",
          meta: error.meta, // Diz exatamente qual campo falhou
        },
      };
    }
    //erro de validação de argumentos, campos inválidos, etc
    if (error instanceof Prisma.PrismaClientValidationError) {
      return {
        statusCode: 400, // Validação sempre será 400 (Bad Request)
        body: {
          type: "ValidationError",
          message: "Dados inválidos enviados para o banco de dados.",
          // Limpa a string gigante tirando as quebras de linha e o caminho do arquivo
          details: error.message.replace(/\s+/g, " ").trim(),
        },
      };
    }

    // Qualquer outro erro desconhecido do Prisma
    return {
      statusCode: 500,
      body: {
        type: "DatabaseUnknownError",
        message: "Ocorreu um erro inesperado no banco de dados.",
      },
    };
  }
}
