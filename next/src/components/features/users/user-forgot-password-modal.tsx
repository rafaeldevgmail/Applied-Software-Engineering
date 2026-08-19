"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ForgotPasswordSchema,
  ForgotPasswordFormData,
} from "@/schemas/userSchema";
import { forgotPassword } from "@/services/userService";
import { toast } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

export function UserForgotPasswordModal() {
  const router = useRouter();
  const { isOpen, handleClose, handleExitComplete } = useModal({
    canClose: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit: formHandleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsSubmitting(true);
    try {
      await forgotPassword(data);
      toast.success("Solicitação enviada! Verifique seu e-mail.", {
        duration: 10000,
        icon: "✉️",
      });
      router.push(
        `/auth/resend-register-token?email=${encodeURIComponent(data.email)}`,
      );
    } catch (error: any) {
      const apiErrorMessage = error.response?.data?.message;
      toast.error(
        apiErrorMessage ||
          "Erro ao solicitar redefinição de senha. Tente novamente mais tarde.",
      );
      console.error("Erro ao solicitar redefinição de senha:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      handleExitComplete={handleExitComplete}
      title="Esqueci a minha senha"
      description="Informe seu e-mail cadastrado e enviaremos um link para redefinir sua senha."
      canClose={false}
    >
      <form onSubmit={formHandleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="E-mail"
          {...register("email")}
          error={errors.email?.message}
          placeholder="nome@empresa.com"
          leftIcon={<Mail />}
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
            {isSubmitting ? "Enviando..." : "Enviar link"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
