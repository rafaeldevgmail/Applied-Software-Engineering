import { AppError } from "@/shared/errors/AppError.ts";
export function authMiddleware(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    throw new AppError("Token nao fornecido. Acesso negado!", 401);
  }

  // Se o token for válido, chama o next() para o Express seguir em frente
  next();
}
