"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  handleClose: () => void;
  handleExitComplete?: () => void;
  title?: string;
  description?: string;
  canClose?: boolean;
}

// Aniamação para o overlay
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0, transition: { duration: 0.25 } },
};

// Animação do modal 3D
export const dialogVariants = {
  hidden: {
    opacity: 0,
    rotateX: -20,
    scale: 0.8,
    filter: "blur(4px)",
    transformPerspective: 500,
  },
  visible: {
    opacity: 1,
    rotateX: 0,
    scale: 1,
    filter: "blur(0px)",
    transformPerspective: 500,
    transition: {
      duration: 0.4, // Duração da animação
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    rotateX: 20,
    scale: 0.8,
    filter: "blur(4px)",
    transformPerspective: 500,
    transition: {
      duration: 0.4,
      ease: "easeIn",
    },
  },
};

export function Modal({
  children,
  isOpen,
  handleClose,
  handleExitComplete,
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
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay de fundo */}
          <motion.div
            className="fixed inset-0 "
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={canClose ? handleClose : undefined}
          />

          {/* Modal 3D */}
          <motion.div
            className="rounded-2xl shadow-lg shadow-indigo-500/20 backdrop-blur-md relative z-10 w-full max-w-md"
            style={{ perspective: 500 }} // Mantém o efeito 3D
            variants={dialogVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="glass-container relative rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 p-6">
              {/* se canClose = true, adiciona o botão de fechar */}
              {canClose && (
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                  aria-label="Fechar modal"
                >
                  <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
                </button>
              )}

              {/* Título e Descrição */}
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

              {/* Conteúdo do Modal */}
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
