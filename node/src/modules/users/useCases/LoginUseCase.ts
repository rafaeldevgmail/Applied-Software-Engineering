import { Request, Response, NextFunction } from "express";
import { IUserRepository } from "@/modules/users/repository/user.repository.interface.ts";
import { AppError } from "@/shared/errors/AppError.ts";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export class LoginUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const user = await this.userRepository.getPassByEmail(email);

    if (!user) {
      throw new AppError("Usuário não encontrado.", 404);
    }

    if (!user.emailVerifiedAt) {
      throw new AppError("Usuário não verificado.", 404);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new AppError("Senha incorreta.", 401);
    }

    return res
      .status(201)
      .json({ message: "Login efetuado com sucesso!", user: user.name });
  }
}
