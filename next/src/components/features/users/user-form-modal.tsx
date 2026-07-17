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
        <div>
          <label className="block text-sm font-medium mb-1">Nome</label>
          {/* mudar a borda do input para vermelho se tiver erro */}
          <input
            type="text"
            {...register("name")}
            className={`w-full p-2 border focus:outline-none focus:border-purple-500 rounded-lg bg-transparent ${errors.name ? "border-red-500" : "border-black-300"}`}
            placeholder="John Doe"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">E-mail</label>
          <input
            type="email"
            {...register("email")}
            className={`w-full p-2 border focus:outline-none focus:border-purple-500 rounded-lg bg-transparent ${errors.email ? "border-red-500" : "border-black-300"}`}
            placeholder="john@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
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
