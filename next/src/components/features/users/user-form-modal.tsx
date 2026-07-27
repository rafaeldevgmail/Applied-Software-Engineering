"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";
import { User } from "@/types/user"; // Importe a tipagem do usuário
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditUserSchema, EditUserFormData } from "@/schemas/userSchema"; // Importe o schema de validação
import { createUser, updateUser } from "@/services/userService";
import { toast } from "react-hot-toast";
import { Input } from "@/components/ui/input";

//Importar icones de lucide-react
import { User as UserIcon, Mail } from "lucide-react";

interface UserFormModalProps {
  userToEdit?: User | null;
}

export function UserFormModal({ userToEdit }: UserFormModalProps) {
  const router = useRouter();
  const { handleClose, overlayAnim, dialogAnim } = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit: formHandleSubmit,
    formState: { errors },
  } = useForm<EditUserFormData>({
    resolver: zodResolver(EditUserSchema),
    defaultValues: {
      name: userToEdit?.name ?? "",
      email: userToEdit?.email ?? "",
    },
  });
  console.log("Erros de validação do formulário:", errors);
  const isEditMode = Boolean(userToEdit);

  const onSubmit = async (data: EditUserFormData) => {
    setIsSubmitting(true);
    try {
      if (isEditMode && userToEdit) {
        await updateUser(userToEdit.id, data);
        toast.success("Usuário atualizado com sucesso!");
      } else {
        await createUser(data);
        toast.success("Usuário criado com sucesso!");
      }
      handleClose();
      router.refresh();
    } catch (error: any) {
      console.error("Erro ao salvar usuário:", error);
      const apiErrorMessage = error.response?.data?.message;

      toast.error(
        apiErrorMessage ||
          "Erro ao salvar usuário. Tente novamente mais tarde.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      handleClose={handleClose}
      overlayAnim={overlayAnim}
      dialogAnim={dialogAnim}
      title={isEditMode ? "Editar Usuário" : "Cadastrar Novo Usuário"}
      description="Preencha os dados do usuário."
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
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium border rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-600 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-500 disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? "Salvando..." : "Salvar Usuário"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
