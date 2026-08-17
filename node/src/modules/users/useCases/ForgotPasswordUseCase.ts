import { Request, Response, NextFunction } from "express";
import { IUserRepository } from "@/modules/users/repository/user.repository.interface.ts";
import { AppError } from "@/shared/errors/AppError.ts";
import jwt from "jsonwebtoken";
import { Mailer } from "@/lib/mailer.ts";

export class ForgotPasswordUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    if (!email || typeof email !== "string") {
      throw new AppError("Informe um e-mail válido.", 400);
    }

    const user = await this.userRepository.findByEmail(email);

    //Não revela se o eamil já existe para evitar ataques de enumeração de usuários
    if (!user) {
      return res.status(200).json({
        message:
          "Se o e-mail informado estiver cadastrado, enviaremos um link de redefinição de senha.",
      });
    }

    const resetToken = jwt.sign(
      { email: user.email, purpose: "password_reset" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    const resetLink = `${process.env.FRONTEND_URL}/auth/reset-password?token=${resetToken}`;

    // Enviar e-mail com o link de redefinição de senha
    try {
      await Mailer.sendMail({
        to: user.email,
        subject: "Redefinição de Senha",
        text: `Olá, para redefinir sua senha clique no link: ${resetLink}`,
        html: `<p>Você solicitou a redefinição de senha. Clique no link abaixo para redefinir sua senha:</p>
               <a href="${resetLink}" style="padding: 10px 20px; background-color: #0070f3; color: white; text-decoration: none; border-radius: 5px; display: inline-block;">Redefinir Senha</a>
               <p>Se você não solicitou essa ação, ignore este e-mail.</p>
               <p>Este link expira em 1 hora.</p>`,
      });
    } catch (error) {
      console.error("Erro ao enviar e-mail de redefinição de senha:", error);
      throw new AppError(
        "Erro ao enviar e-mail de redefinição de senha. Tente novamente mais tarde",
        500,
      );
    }

    return {
      message:
        "Se o e-mail informado estiver cadastrado, enviaremos um link de redefinição de senha.",
    };
  }
}
