import { Request, Response, NextFunction } from "express";
import { IUserRepository } from "@/modules/users/repository/user.repository.interface.ts";
import { AppError } from "@/shared/errors/AppError.ts";
import jwt from "jsonwebtoken";
import { Mailer } from "@/lib/mailer.ts";

export class ResendRegisterTokenUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    if (!email || typeof email !== "string") {
      throw new AppError("Informe um e-mail válido.", 400);
    }

    const user = await this.userRepository.findByEmail(email);

    // Não revela se o e-mail existe para evitar enumeração de usuários
    if (!user) {
      return res.status(200).json({
        message:
          "Se o e-mail informado estiver cadastrado, enviaremos um novo link de validação.",
      });
    }

    // Usuário já completou o registro, não é necessário reenviar o token
    if (user.emailVerifiedAt) {
      return res.status(200).json({
        message: "Conta já ativada. Você já pode fazer login.",
      });
    }

    const registrationToken = jwt.sign(
      { name: user.name, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" },
    );
    const confirmationLink = `${process.env.FRONTEND_URL}/api/register/activate?token=${registrationToken}`;

    try {
      await Mailer.sendMail({
        to: user.email,
        subject: `Olá ${user.name}, Valide sua conta! ✔`,
        text: `Olá ${user.name}, por favor valide sua conta clicando no link: ${confirmationLink}`,
        html: `
          <h1>Falta pouco!</h1>
          <p>Olá ${user.name},</p><p>Por favor valide sua conta clicando no link abaixo:</p><a href="${confirmationLink}" style="padding: 10px 20px; background-color: #0070f3; color: white; text-decoration: none; border-radius: 5px; display: inline-block;">Validar Conta</a>`,
      });
    } catch (error) {
      console.error("Erro ao enviar email de validação:", error);
      throw new AppError(
        "Não foi possível enviar o email de validação. Tente novamente mais tarde.",
        500,
      );
    }

    return res.status(200).json({
      message:
        "Se o e-mail informado estiver cadastrado, enviaremos um novo link de validação.",
    });
  }
}
