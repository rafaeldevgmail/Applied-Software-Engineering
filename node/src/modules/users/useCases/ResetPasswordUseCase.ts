import { Request, Response, NextFunction } from "express";
import { IUserRepository } from "@/modules/users/repository/user.repository.interface.ts";
import { AppError } from "@/shared/errors/AppError.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface IResetPasswordDTO {
  token: string;
  password: string;
  passwordConfirmation: string;
}
export class ResetPasswordUseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> {
    const { token, password, passwordConfirmation } = req.body;

    if (!token || typeof token !== "string") {
      throw new AppError("Token de redefinição inválido.", 400);
    }
    if (!password || !passwordConfirmation) {
      throw new AppError("Informe a nova senha e sua confirmação.", 400);
    }
    if (password !== passwordConfirmation) {
      throw new AppError("As senhas não coincidem.", 400);
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET) as {
        email: string;
        purpose: string;
      };
    } catch (error) {
      throw new AppError("Token de redefinição inválido.", 400);
    }

    if (decodedToken.purpose !== "password_reset") {
      throw new AppError("Token de redefinição inválido.", 400);
    }

    const user = await this.userRepository.findByEmail(decodedToken.email);
    if (!user) {
      throw new AppError("Usuário não encontrado.", 404);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await this.userRepository.update(user.id, {
      password: hashedPassword,
      rememberToken: null,
    });
    return { message: "Senha redefinida com sucesso." };
  }
}
