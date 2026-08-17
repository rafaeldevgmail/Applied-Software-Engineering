import * as nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false, // Allow self-signed certificates
  },
});

export interface SendMailParams {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export class Mailer {
  static async sendMail(params: SendMailParams) {
    return transporter.sendMail({
      from: '"No Reply" <no-reply@meuapp.com>',
      ...params,
    });
  }
}
