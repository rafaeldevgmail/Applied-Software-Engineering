"use client";

import { useState, useEffect } from "react";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import { Client } from "@/types/client";
//Importar icones de lucide-react
import {
  User as UserIcon,
  Mail,
  Building,
  Phone,
  NotebookPen,
  Info,
} from "lucide-react";
import { getUserById } from "@/services/userService";

interface ClientViewModalProps {
  clientToView?: Client | null;
}

export function ClientViewModal({ clientToView }: ClientViewModalProps) {
  const { isOpen, handleClose, handleExitComplete } = useModal();

  // Estado para guardar o nome do usuário e o status de carregamento
  const [userName, setUserName] = useState<string>("Carregando...");

  //Buscar os dados do usuário via useEffect quando o clienteToView mudar
  useEffect(() => {
    let isMounted = true;

    async function loadUserData() {
      if (!clientToView?.userId) {
        setUserName("Não vinculado");
        return;
      }

      setUserName("Carregando...");

      try {
        const user = await getUserById(clientToView.userId);
        if (isMounted) {
          setUserName(user?.name || user?.email || "Usuário não encontrado");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        if (isMounted) {
          setUserName("Erro ao carregar");
        }
      }
    }
    loadUserData();

    return () => {
      isMounted = false;
    };
  }, [clientToView?.userId]);

  if (!clientToView) return null;

  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      handleExitComplete={handleExitComplete}
      title="Visualizar Cliente"
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
              <span className="font-medium">{clientToView.name}</span>
            </div>
          </div>

          {/* E-mail */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
              E-mail
            </label>
            <div className="truncate flex items-center gap-2.5 p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/60 text-zinc-900 dark:text-zinc-100 text-sm">
              <Mail className="w-4 h-4 text-zinc-500 shrink-0" />
              <span>{clientToView.email}</span>
            </div>
          </div>

          {/* Telefone */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
              Telefone
            </label>
            <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/60 text-zinc-900 dark:text-zinc-100 text-sm">
              <Phone className="w-4 h-4 text-zinc-500 shrink-0" />
              <span>{clientToView.phone}</span>
            </div>
          </div>

          {/* Empresa */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
              Empresa
            </label>
            <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/60 text-zinc-900 dark:text-zinc-100 text-sm">
              <Building className="w-4 h-4 text-zinc-500 shrink-0" />
              <span>{clientToView.company}</span>
            </div>
          </div>

          {/* Usuário */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
              Usuário
            </label>
            <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/60 text-zinc-900 dark:text-zinc-100 text-sm">
              <Info className="w-4 h-4 text-zinc-500 shrink-0" />
              <span>{userName}</span>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
              Status
            </label>
            <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/60 text-zinc-900 dark:text-zinc-100 text-sm">
              <Info className="w-4 h-4 text-zinc-500 shrink-0" />
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                {clientToView.status}
              </span>
            </div>
          </div>

          {/* Notas (Ocupando 2 colunas se houver espaço) */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
              Notas
            </label>
            <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/60 text-zinc-900 dark:text-zinc-100 text-sm">
              <NotebookPen className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5" />
              <p className="whitespace-pre-wrap">
                {clientToView.notes || "Nenhuma nota registrada."}
              </p>
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
