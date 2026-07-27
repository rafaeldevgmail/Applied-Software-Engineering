"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import { deleteClient } from "@/services/clientService";
import { toast } from "react-hot-toast";

interface DeleteConfirmModalProps {
  clientId: number;
  clientName: string;
}

export function DeleteConfirmModal({
  clientId,
  clientName,
}: DeleteConfirmModalProps) {
  const router = useRouter();
  const { handleClose, overlayAnim, dialogAnim } = useModal();

  const handleDelete = async () => {
    try {
      await deleteClient(clientId);
      toast.success("Cliente excluido com sucesso!");
      // Fecha o modal e atualiza a listagem de clientes na tela
      handleClose();
      router.refresh();
    } catch (error: any) {
      console.error("Erro ao excluir cliente:", error);
      toast.error("Erro ao excluir cliente. Por favor, tente novamente.");
    }
  };

  return (
    <Modal
      handleClose={handleClose}
      overlayAnim={overlayAnim}
      dialogAnim={dialogAnim}
      title="Excluir Cliente?"
    >
      <p className="text-sm text-zinc-600 dark:text-zinc-200 mb-6">
        Tem certeza que deseja excluir <strong>{clientName}</strong>? Esta ação
        não poderá ser desfeita.
      </p>
      <div className="flex justify-end gap-3">
        <button
          onClick={handleClose}
          className="px-4 py-2 text-sm font-medium border rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-600 cursor-pointer"
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
