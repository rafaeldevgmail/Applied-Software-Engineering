"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ResetPasswordSchema,
  ResetPasswordFormData,
} from "@/schemas/userSchema";
import { resetPassword } from "@/services/userService";
import { toast } from "react-hot-toast";
import { PasswordField } from "@/components/ui/password-field";
import AlertCard from "@/components/ui/alertCard";
import { Mail } from "lucide-react";

interface UserResetPasswordModalProps {
  email?: string;
  token?: string;
}

interface DecodedResetToken {
  email?: string;
  purpose?: string;
  exp?: number;
}

function decodeJwtPayload(token: string): DecodedResetToken | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      "=",
    );

    return JSON.parse(atob(padded)) as DecodedResetToken;
  } catch (error) {
    return null;
  }
}

export function UserResetPasswordModal({
  email,
  token,
}: UserResetPasswordModalProps) {
  const router = useRouter();
  const { isOpen, handleClose, handleExitComplete } = useModal({
    canClose: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const payload = token ? decodeJwtPayload(token) : null;
  const tokenIsValid =
    !!payload &&
    payload.purpose === "password_reset" &&
    typeof payload.exp === "number" &&
    payload.exp > Date.now() / 1000;

  const tokenEmail = payload?.email ?? email;
  const {
    register,
    handleSubmit: formHandleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      token: token ?? "",
    },
  });

  useEffect(() => {
    if (token) setValue("token", token);
  }, [token, setValue]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsSubmitting(true);
    try {
      if (!token || !tokenIsValid) {
        throw new Error("Token de redefinição inválido ou expirado.");
      }

      await resetPassword({
        email: tokenEmail ?? "",
        token,
        password: data.password,
        passwordConfirmation: data.password_confirmation,
      });
      console.log("Senha redefinida com sucesso!");
      toast.success("Senha redefinida com sucesso!", {
        duration: 10000,
        icon: "✔",
      });
      router.push("/auth/login");
    } catch (error: any) {
      const apiErrorMessage = error.response?.data?.message;
      toast.error(
        apiErrorMessage ||
          "Erro ao redefinir a senha. Tente novamente mais tarde.",
      );
      console.error("Erro ao redefinir a senha:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      handleExitComplete={handleExitComplete}
      title="Redefinir Senha"
      description="Digite sua nova senha abaixo."
      canClose={false}
    >
      {!tokenIsValid ? (
        <div className="space-y-4">
          <div className="text-sm text-zinc-500 dark:text-zinc-400">
            <AlertCard
              type="warning"
              theme="light"
              title={`${!token ? "Link inválido" : "Link inválido ou expirado"}`}
            >
              {!token
                ? "Nenhum token de redefinição foi informado. Solicite um novo link de redefinição de senha."
                : "Solicite um novo link de redefinição de senha."}
            </AlertCard>
          </div>
          <div className="flex justify-between gap-3 pt-4">
            <button
              type="button"
              onClick={(back) => router.back()}
              className="bg-white/30 hover:bg-white/50 dark:bg-white/10 dark:hover:bg-white/20 font-medium py-2.5 px-4 rounded-xl border border-white/10 transition text-sm cursor-pointer"
            >
              Voltar
            </button>
            <button
              type="button"
              onClick={() => router.push("/auth/forgot-password")}
              className="px-4 py-2 text-sm font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-500 cursor-pointer"
            >
              Solicitar novo link
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={formHandleSubmit(onSubmit)} className="space-y-4">
          <input type="hidden" {...register("token")} />
          <p className="text-sm text-zinc-600 dark:text-zinc-200 mb-6">
            Insira uma nova senha para redefinir a senha do usuário.
          </p>
          {tokenEmail && (
            <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
              <Mail className="w-4 h-4" />
              <span>{tokenEmail}</span>
            </div>
          )}
          <PasswordField
            label="Nova Senha"
            placeholder="Digite sua nova senha"
            error={errors.password}
            register={register("password")}
          />
          <PasswordField
            label="Confirmar Nova Senha"
            placeholder="Confirme sua nova senha"
            error={errors.password_confirmation}
            register={register("password_confirmation")}
          />
          <div className="flex justify-between gap-3 pt-4">
            <button
              type="button"
              onClick={(back) => router.back()}
              className="bg-white/30 hover:bg-white/50 dark:bg-white/10 dark:hover:bg-white/20 font-medium py-2.5 px-4 rounded-xl border border-white/10 transition text-sm cursor-pointer"
            >
              Voltar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-500 disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? "Salvando..." : "Redefinir senha"}
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
