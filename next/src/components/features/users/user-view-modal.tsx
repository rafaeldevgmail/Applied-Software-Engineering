"use client";

import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import { User } from "@/types/user";

interface UserViewModalProps {
  userToView?: User | null;
}

export function UserViewModal({ userToView }: UserViewModalProps) {
  const { handleClose, overlayAnim, dialogAnim } = useModal();

  if (!userToView) return null;

  return (
    <Modal
      handleClose={handleClose}
      overlayAnim={overlayAnim}
      dialogAnim={dialogAnim}
      title="Visualizar Usuário"
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nome</label>
          <p className="text-zinc-900 dark:text-zinc-100">{userToView.name}</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">E-mail</label>
          <p className="text-zinc-900 dark:text-zinc-100">{userToView.email}</p>
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium border rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-600 cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </Modal>
  );
}
