"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import { deleteUser } from "@/services/userService";
import { toast } from "react-hot-toast";

interface DeleteConfirmModalProps {
  userId: number;
  userName: string;
}

export function DeleteConfirmModal({
  userId,
  userName,
}: DeleteConfirmModalProps) {
  const router = useRouter();
  const { isOpen, handleClose, handleExitComplete } = useModal();

  const handleDelete = async () => {
    try {
      await deleteUser(userId);
      toast.success("Usuário excluido com sucesso!");
      // Fecha o modal e atualiza a listagem de usuários na tela
      handleClose();
      router.refresh();
    } catch (error: any) {
      console.error("Erro ao excluir usuário:", error);
      toast.error("Erro ao excluir usuário. Por favor, tente novamente.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      handleExitComplete={handleExitComplete}
      title="Excluir Usuário?"
    >
      <p className="text-sm text-zinc-600 dark:text-zinc-200 mb-6">
        Tem certeza que deseja excluir <strong>{userName}</strong>? Esta ação
        não poderá ser desfeita.
      </p>
      <div className="flex justify-end gap-3">
        <button
          onClick={handleClose}
          className="px-4 py-2 text-sm font-medium border border-zinc-200 dark:border-zinc-600 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-600 cursor-pointer"
        >
          Cancelar
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 text-sm font-medium bg-rose-600 text-white rounded-lg hover:bg-rose-500 cursor-pointer"
        >
          Confirmar Exclusão
        </button>
      </div>
    </Modal>
  );
}
