import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface ModalProps {
  children: React.ReactNode;
  handleClose: () => void;
  overlayAnim: string;
  dialogAnim: string;
  title?: string;
  description?: string;
  canClose?: boolean;
}

export function Modal({
  children,
  handleClose,
  overlayAnim,
  dialogAnim,
  title,
  description,
  canClose = true,
}: ModalProps) {
  // Estado para controlar se está no navegador
  const [isMounted, setIsMounted] = useState(false);

  // O useEffect só dispara no Client-Side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Se ainda estiver no servidor (SSR), retorna null para evitar o erro do document
  if (!isMounted) {
    return null;
  }
  // Após o Client-Side, renderiza o portal
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className={`fixed inset-0 ${overlayAnim}`} onClick={handleClose} />
      <div
        className={`rounded-2xl shadow-lg shadow-indigo-500/20 backdrop-blur-md relative z-10 w-full max-w-md ${dialogAnim}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="glass-container relative rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-6">
          {/* se canClose = true, adiciona o botão de fechar */}
          {canClose && (
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors cursor-pointer"
            >
              <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
            </button>
          )}

          {title && (
            <div className="mb-6">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                {title}
              </h2>
              {description && (
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {description}
                </p>
              )}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}
