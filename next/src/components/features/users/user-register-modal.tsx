"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";
import { User } from "@/types/user"; // Importe a tipagem do usuário
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateUserSchema, CreateUserFormData } from "@/schemas/userSchema"; // Importe o schema de validação
import { createUser, updateUser } from "@/services/userService";
import { toast } from "react-hot-toast";
import { PasswordField } from "@/components/ui/password-field";
import { Input } from "@/components/ui/input";

//Importar icones de lucide-react
import { User as UserIcon, Mail } from "lucide-react";

export function UserRegisterModal() {
  const router = useRouter();
  const { isOpen, handleClose, handleExitComplete } = useModal({
    canClose: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit: formHandleSubmit,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(CreateUserSchema),
  });
  console.log("Erros de validação do formulário:", errors);
  const isEditMode = Boolean();

  const onSubmit = async (data: CreateUserFormData) => {
    setIsSubmitting(true);
    try {
      await createUser(data);
      toast.success("Usuário criado com sucesso!");

      handleClose();
      //vai para a página de login
      router.push("/auth/login?registered=true");
    } catch (error: any) {
      const apiErrorMessage = error.response?.data?.message;

      toast.error(
        apiErrorMessage ||
          "Erro ao cadastrar usuário. Tente novamente mais tarde.",
      );
      console.error("Erro ao cadastrar usuário:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      handleExitComplete={handleExitComplete}
      title={isEditMode ? "Editar Usuário" : "Cadastrar Novo Usuário"}
      description="Preencha os dados do usuário."
      canClose={false}
    >
      <form onSubmit={formHandleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nome */}
          <Input
            label="Nome"
            {...register("name")}
            error={errors.name?.message}
            placeholder="Nome Completo"
            leftIcon={<UserIcon />}
          />

          {/* Email */}
          <Input
            label="E-mail"
            {...register("email")}
            error={errors.email?.message}
            placeholder="nome@empresa.com"
            leftIcon={<Mail />}
          />

          {/* Campo Senha */}
          <PasswordField
            label="Senha"
            placeholder="Digite sua senha"
            error={errors.password as any}
            register={register("password")}
          />

          {/* Campo Confirmar Senha */}
          <PasswordField
            label="Confirmar Senha"
            placeholder="Confirme sua senha"
            error={errors.password_confirmation as any}
            register={register("password_confirmation")}
          />
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={(back) => router.back()}
            className="px-4 py-2 text-sm font-medium border border-zinc-200 dark:border-zinc-600 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-600 cursor-pointer"
          >
            Voltar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-500 disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? "Cadastrando..." : "Cadastrar"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
