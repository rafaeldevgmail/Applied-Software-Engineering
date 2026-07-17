import { Request, Response, NextFunction } from "express";
import { IUserRepository } from "@/modules/users/repository/user.repository.interface.ts";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AppError } from "@/shared/errors/AppError.ts";
import * as nodemailer from "nodemailer";

export class RegisterStartUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(req: Request, res: Response, next: NextFunction) {
    // Recupera os dados do corpo da requisição
    const { name, email, password, password_confirmation } = req.body;

    if (!name || !email || !password || !password_confirmation) {
      throw new AppError("Todos os campos são obrigatórios", 400);
    }
    if (password !== password_confirmation) {
      throw new AppError("As senhas não coincidem", 400);
    }

    // Verifica se o usuário já existe no banco
    const userExists = await this.userRepository.findByEmail(email);
    if (userExists) {
      throw new AppError("Este email já está sendo utilizado", 409);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    //Assina os dados no JWT com expiração de 1 hora
    const registrationToken = jwt.sign(
      { name: name, email: email },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" },
    );
    const confirmationLink = `${process.env.FRONTEND_URL}/api/register/activate?token=${registrationToken}`;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
        rejectUnauthorized: false, // Permite certificados autoassinados
      },
    });

    let info = null;
    try {
      info = await transporter.sendMail({
        from: '"No Reply" <noreply@meuapp.com>',
        to: email,
        subject: `Olá ${name}, Valide sua conta! ✔`,
        text: `Olá ${name}, por favor valide sua conta clicando no link: ${confirmationLink}`,
        html: `
        <h1>Falta pouco!</h1>
        <p>Olá ${name},</p><p>Por favor valide sua conta clicando no link abaixo:</p><a href="${confirmationLink}" style="padding: 10px 20px; background-color: #0070f3; color: white; text-decoration: none; border-radius: 5px; display: inline-block;">Validar Conta</a>`,
      });
    } catch (error) {
      console.error("Erro ao enviar email de validação:", error);
      throw new AppError(
        "Não foi possível enviar o email de validação. Tente novamente mais tarde.",
        500,
      );
    }
    console.log("E-mail enviado: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    const newUser = await this.userRepository.create(req.body);
    console.log(newUser);
    return res
      .status(201)
      .json({ message: "Usuário cadastrado com sucesso!", user: newUser });
  }
}
