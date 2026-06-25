import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { PrismaErrorHandler } from "../errors/prismaErrorHandler.ts";

export function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (
    error instanceof Prisma.PrismaClientKnownRequestError ||
    error instanceof Prisma.PrismaClientValidationError
  ) {
    const formattedError = PrismaErrorHandler.format(error);
    return res.status(400).json(formattedError);
  }

  console.error("❌ Internal Server Error:", error);
  return res.status(500).json({
    type: "InternalServerError",
    message: "Ocorreu um erro inesperado no servidor.",
  });
}
