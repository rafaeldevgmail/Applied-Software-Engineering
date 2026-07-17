"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
    toast.error(error.message || "Algo deu errado.");
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Ocorreu um erro!</h1>
      <p className="text-zinc-500 dark:text-zinc-400 mb-6">
        {error.message || "Algo deu errado. Por favor, tente novamente."}
      </p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-500 cursor-pointer"
      >
        Tentar Novamente
      </button>
    </div>
  );
}
