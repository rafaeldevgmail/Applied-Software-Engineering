"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { UserLoginModal } from "@/components/features/users/user-login-modal";

interface PageProps {
  searchParams: Promise<{
    modal?: string;
    registered?: string;
    activated?: string;
  }>;
}

function RegistrationSuccessToast() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // 1. Toast para quando acaba de se registrar
    if (searchParams.get("registered") === "true") {
      toast.success(
        "Cadastro realizado! Verifique seu e-mail para confirmação.",
        {
          duration: 10000,
          icon: "✉️",
          id: "email-confirmation-toast",
        },
      );
      window.history.replaceState({}, "", "/auth/login");
    }

    // 2. Toast para quando a conta foi ativada com sucesso
    if (searchParams.get("activated") === "true") {
      toast.success("Conta ativada com sucesso! Você já pode fazer login.", {
        duration: 10000,
        icon: "✅",
        id: "account-activated-toast",
      });
      window.history.replaceState({}, "", "/auth/login");
    }
  }, [searchParams]);

  return null;
}

export default async function LoginPage({ searchParams }: PageProps) {
  const { registered } = await searchParams;

  const isModalOpen = registered !== "true";

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      <RegistrationSuccessToast />
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        {isModalOpen && <UserLoginModal />}
      </div>
    </div>
  );
}
