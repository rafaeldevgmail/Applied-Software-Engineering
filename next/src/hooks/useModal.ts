"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

export function useModal({ canClose = true } = { canClose: true }) {
  const router = useRouter();
  //Cria o estado `isClosing` para controlar a animação de fechamento do modal.
  const [isOpen, setIsOpen] = useState(true);

  //Inicia o processo de fechamento alterando o estado
  const handleClose = useCallback(() => {
    if (!canClose) return;
    setIsOpen(false);
  }, [canClose]);

  // método chamado pelo Motion quando a animação de saída (exit) termina
  const handleExitComplete = useCallback(() => {
    router.back();
  }, [router]);

  //Efeito para adicionar o listener de teclado quando o modal está aberto.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    //Retorna uma função de limpeza (cleanup) que roda quando o componente é desmontado.
    return () => {
      //Remove o evento do teclado para evitar vazamento de memória.
      window.removeEventListener("keydown", handleKeyDown);
    };
    //Passa `handleClose` como dependência.
  }, [handleClose]);

  return { isOpen, handleClose, handleExitComplete };
}
