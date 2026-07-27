import { z } from "zod";

export const UserBaseSchema = z.object({
  name: z
    .string()
    .min(1, "O nome é obrigatório")
    .min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().min(1, "O e-mail é obrigatório").email("E-mail inválido"),
});

export const CreateUserSchema = UserBaseSchema.extend({
  password: z
    .string()
    .min(1, "A senha é obrigatória")
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
    .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
    .regex(/[0-9]/, "A senha deve conter pelo menos um número")
    .regex(
      /[^A-Za-z0-9]/,
      "A senha deve conter pelo menos um caractere especial (@, #, $, etc.)",
    ),
  password_confirmation: z.string().min(1, "A senha é obrigatória"),
}).refine((data) => data.password === data.password_confirmation, {
  message: "As senhas precisam ser iguais",
  path: ["password_confirmation"],
});

export const LoginUserSchema = z.object({
  email: z.string().email({ message: "E-mail inválido" }),
  password: z.string().min(1, { message: "A senha é obrigatória" }),
});
export const EditUserSchema = UserBaseSchema.extend({});

export type CreateUserFormData = z.infer<typeof CreateUserSchema>;
export type EditUserFormData = z.infer<typeof EditUserSchema>;
export type LoginUserFormData = z.infer<typeof LoginUserSchema>;
export type UserBaseFormData = z.infer<typeof UserBaseSchema>;
