import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { PrismaErrorHandler } from "@/shared/errors/prismaErrorHandler.ts";
import { AppError } from "@/shared/errors/AppError.ts";
export function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error.name?.startsWith("PrismaClient")) {
    const { statusCode, body } = PrismaErrorHandler.format(error);
    return res.status(statusCode).json(body);
  }
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      type: "AppError",
      message: error.message,
    });
  }

  console.error("❌ Internal Server Error:", error);
  return res.status(500).json({
    type: "InternalServerError",
    message: "Ocorreu um erro inesperado no servidor.",
  });
}
