"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";
import { Client } from "@/types/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditClientSchema, EditClientFormData } from "@/schemas/clientSchema"; // Importe o schema de validação
import { createClient, updateClient } from "@/services/clientService";
import { toast } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Dropdown } from "@/components/ui/dropdown";
import { getUsers } from "@/services/userService";

//Importar icones de lucide-react
import {
  User as UserIcon,
  Mail,
  Building,
  Phone,
  NotebookPen,
  Info,
} from "lucide-react";

interface ClientFormModalProps {
  clientToEdit?: Client | null;
}

const { data: users, total: totalUsuarios } = await getUsers();
const userOptions =
  users && users.length > 0
    ? users.map((user) => ({
        label: user.name ?? user.email,
        value: user.id,
      }))
    : [];
const statuses = [
  { label: "Ativo", value: "active" },
  { label: "Inativo", value: "inactive" },
  { label: "Prospect", value: "prospect" },
];
export function ClientFormModal({ clientToEdit }: ClientFormModalProps) {
  const router = useRouter();
  const { isOpen, handleClose, handleExitComplete } = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit: formHandleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EditClientFormData>({
    resolver: zodResolver(EditClientSchema),
    defaultValues: {
      name: clientToEdit?.name ?? "",
      email: clientToEdit?.email ?? "",
      phone: clientToEdit?.phone ?? "",
      company: clientToEdit?.company ?? "",
      status: clientToEdit?.status ?? "",
      notes: clientToEdit?.notes ?? "",
      userId: clientToEdit?.userId ?? null,
    },
  });
  console.log("Erros de validação do formulário:", errors);
  const isEditMode = Boolean(clientToEdit);

  const onSubmit = async (data: EditClientFormData) => {
    setIsSubmitting(true);
    try {
      if (isEditMode && clientToEdit) {
        await updateClient(clientToEdit.id, data);
        toast.success("Cliente atualizado com sucesso!");
      } else {
        await createClient(data);
        toast.success("Cliente criado com sucesso!");
      }
      handleClose();
      router.refresh();
    } catch (error: any) {
      console.error("Erro ao salvar cliente:", error);
      const apiErrorMessage = error.response?.data?.message;

      toast.error(
        apiErrorMessage ||
          "Erro ao salvar cliente. Tente novamente mais tarde.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      handleExitComplete={handleExitComplete}
      title={isEditMode ? "Editar Cliente" : "Cadastrar Novo Cliente"}
      description="Preencha os dados do cliente."
    >
      <form onSubmit={formHandleSubmit(onSubmit)}>
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

          {/* Telefone */}
          <Input
            label="Fone"
            {...register("phone")}
            error={errors.phone?.message}
            placeholder="+55 (00) 00000-0000"
            leftIcon={<Phone />}
          />

          {/* Empresa */}
          <Input
            label="Empresa"
            {...register("company")}
            error={errors.company?.message}
            placeholder="Empresa"
            leftIcon={<Building />}
          />

          {/* Usuário */}
          <Dropdown
            label="Usuário"
            options={userOptions}
            leftIcon={<UserIcon />}
            error={errors.userId?.message}
            value={watch("userId") ?? null}
            onChange={(value) =>
              setValue("userId", value as number, { shouldValidate: true })
            }
            placeholder="Usuário"
            searchable={true}
            searchPlaceholder="Buscar Usuário..."
          />

          {/* Status */}
          <Dropdown
            label="Status"
            options={statuses}
            leftIcon={<Info />}
            error={errors.status?.message}
            value={watch("status") ?? ""}
            onChange={(val) =>
              setValue("status", val as string, { shouldValidate: true })
            }
            placeholder="Status"
          />

          {/* Notas (Ocupando 2 colunas se houver espaço) */}

          <div className="md:col-span-2">
            <Input
              label="Notas"
              {...register("notes")}
              error={errors.notes?.message}
              placeholder="Notas"
              leftIcon={<NotebookPen />}
            />
          </div>
        </div>
        <div className="flex justify-between gap-3 pt-4">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium border border-zinc-200 dark:border-zinc-600 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-600 cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? "Salvando..." : "Salvar Cliente"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
