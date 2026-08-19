"use client";

import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import { User } from "@/types/user";

import {
  User as UserIcon,
  Mail,
  Building,
  Phone,
  NotebookPen,
  Info,
} from "lucide-react";
interface UserViewModalProps {
  userToView?: User | null;
}

export function UserViewModal({ userToView }: UserViewModalProps) {
  const { isOpen, handleClose, handleExitComplete } = useModal();

  if (!userToView) return null;

  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      handleExitComplete={handleExitComplete}
      title="Visualizar Usuário"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nome */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
              Nome
            </label>
            <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/60 text-zinc-900 dark:text-zinc-100 text-sm">
              <UserIcon className="w-4 h-4 text-zinc-500 shrink-0" />
              <span className="font-medium">{userToView.name}</span>
            </div>
          </div>

          {/* E-mail */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
              E-mail
            </label>
            <div className="truncate flex items-center gap-2.5 p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/60 text-zinc-900 dark:text-zinc-100 text-sm">
              <Mail className="w-4 h-4 text-zinc-500 shrink-0" />
              <span>{userToView.email}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={handleClose}
            className="bg-white/30 hover:bg-white/50 dark:bg-white/10 dark:hover:bg-white/20 font-medium py-2.5 px-4 rounded-xl border border-white/10 transition text-sm cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </Modal>
  );
}
