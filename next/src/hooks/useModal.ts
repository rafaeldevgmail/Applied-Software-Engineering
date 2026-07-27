"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

export function useModal({ canClose = true } = { canClose: true }) {
  const router = useRouter();
  //Cria o estado `isClosing` para controlar a animação de fechamento do modal.
  const [isClosing, setIsClosing] = useState(false);
  //Cria a referência `closingRef` para evitar que a função de fechar seja executada duas vezes seguidas.
  const closingRef = useRef(false);
  //Cria a referência `timeoutRef` para guardar o identificador do timer da animação.
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  if (!canClose) {
    const overlayAnim = isClosing
      ? "animate-overlay-out"
      : "animate-overlay-in";
    const dialogAnim = isClosing ? "animate-dialog-out" : "animate-dialog-in";
    return {
      isClosing,
      handleClose: () => {},
      overlayAnim,
      dialogAnim,
    };
  }
  //Define a função `handleClose` memorizada com `useCallback` para não ser recriada inutilmente.
  const handleClose = useCallback(() => {
    //Se o fechamento já começou (`closingRef.current` é verdadeiro), interrompe a execução.
    if (closingRef.current) return;
    //Marca a referência `closingRef` como verdadeira, travando novos cliques.
    closingRef.current = true;
    //Altera o estado `isClosing` para verdadeiro, disparando as animações de saída.
    setIsClosing(true);
    //Inicia um temporizador de 250 milissegundos (tempo da animação).
    timeoutRef.current = setTimeout(() => {
      //Após o tempo acabar, volta para a rota anterior (fecha a interceptação)
      router.back();
    }, 500);
    //Fecha o bloco do `useCallback` e passa o `router` como dependência.
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
      //Limpa o temporizador ativo caso o usuário saia da tela antes dos 250ms.
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    //Passa `handleClose` como dependência.
  }, [handleClose]);

  const overlayAnim = isClosing ? "animate-overlay-out" : "animate-overlay-in";
  const dialogAnim = isClosing ? "animate-dialog-out" : "animate-dialog-in";

  return { isClosing, handleClose, overlayAnim, dialogAnim };
}
