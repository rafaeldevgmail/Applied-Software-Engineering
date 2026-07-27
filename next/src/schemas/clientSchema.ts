import { z } from "zod";

export const ClientBaseSchema = z.object({
  name: z
    .string()
    .min(1, "O nome é obrigatório")
    .min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().min(1, "O e-mail é obrigatório").email("E-mail inválido"),
  userId: z.number("O usuário é obrigatório").min(1, "O usuário é obrigatório"),
  phone: z.string("").optional(),
  company: z.string("").optional(),
  status: z.string("").optional(),
  notes: z.string("").optional(),
});

export const CreateClientSchema = ClientBaseSchema.extend({});
export const EditClientSchema = ClientBaseSchema.extend({});

export type CreateClientFormData = z.infer<typeof CreateClientSchema>;
export type EditClientFormData = z.infer<typeof EditClientSchema>;
export type ClientBaseFormData = z.infer<typeof ClientBaseSchema>;
