import { Request, Response, NextFunction } from "express";
import { IUserRepository } from "@/modules/users/repository/user.repository.interface.ts";
import { AppError } from "@/shared/errors/AppError.ts";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export class RegisterCompleteUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(req: Request, res: Response, next: NextFunction) {
    const { token } = req.body;

    if (!token || typeof token !== "string") {
      throw new AppError("Token de registro inválido", 400);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as {
      name: string;
      email: string;
    };
    const user = await this.userRepository.findByEmail(decoded.email);

    // 1. Validação de segurança
    if (!user) {
      throw new AppError("Usuário nao encontrado.", 404);
    }

    // 2. Atualização segura
    await this.userRepository.update(user.id, {
      emailVerifiedAt: new Date(),
    });
    return res
      .status(201)
      .json({ message: "Conta ativada com sucesso!", user: user.name });
  }
}
