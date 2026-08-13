"use client";

import { use } from "react";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { UserLoginModal } from "@/components/features/users/user-login-modal";
import { z } from "zod";

interface PageProps {
  searchParams: Promise<{
    modal?: string;
    registered?: string;
    activated?: string;
  }>;
}

const searchParamsSchema = z.object({
  error: z
    .enum([
      "CredentialsSignin",
      "AccessDenied",
      "Configuration",
      "OAuthSignin",
      "OAuthCallback",
      "OAuthAccountNotLinked",
    ])
    .optional(),
});
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
        icon: "✔",
        id: "account-activated-toast",
      });
      window.history.replaceState({}, "", "/auth/login");
    }

    // 3. === VALIDAÇÃO E TOAST PARA ERROS DO NEXTAUTH ===
    // Valida o parâmetro da URL de forma segura com o Zod
    const parsed = searchParamsSchema.safeParse({
      error: searchParams.get("error") || undefined,
    });

    // Se a valiudação passou existe um erro válido da URL, então exibe o toast de erro
    if (parsed.success && parsed.data.error) {
      const errorKey = parsed.data.error;
      const errorMessages: Record<string, string> = {
        CredentialsSignin: "E-mail ou senha inválidos.",
        AccessDenied: "Acesso negado. Tente novamente.",
        Configuration: "Erro de configuração. Contate o suporte.",
        OAuthSignin: "Erro ao tentar autenticar com OAuth. Tente novamente.",
        OAuthCallback: "Erro no callback do OAuth. Tente novamente.",
        OAuthAccountNotLinked:
          "Conta OAuth não vinculada. Use outro método de login.",
      };

      // Busca a mensagem mapeada ou usa um fallback genérico seguro
      const message =
        errorMessages[errorKey] ||
        "Erro ao entrar. Tente novamente mais tarde.";
      toast.error(message, { duration: 10000, id: "auth-error-toast" });
      window.history.replaceState({}, "", "/auth/login");
    }
  }, [searchParams]);

  return null;
}

export default function LoginPage({ searchParams }: PageProps) {
  const resolvedSearchParams = use(searchParams);
  const registered = resolvedSearchParams.registered;

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
