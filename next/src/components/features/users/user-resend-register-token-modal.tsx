"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ResendRegisterTokenSchema,
  ResendRegisterTokenFormData,
} from "@/schemas/userSchema";
import { resendRegisterToken } from "@/services/userService";
import { toast } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

interface UserResendRegisterTokenModalProps {
  email?: string;
}
export function UserResendRegisterTokenModal({
  email,
}: UserResendRegisterTokenModalProps) {
  const router = useRouter();
  const { isOpen, handleClose, handleExitComplete } = useModal({
    canClose: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit: formHandleSubmit,
    formState: { errors },
  } = useForm<ResendRegisterTokenFormData>({
    resolver: zodResolver(ResendRegisterTokenSchema),
  });

  const onSubmit = async (data: ResendRegisterTokenFormData) => {
    setIsSubmitting(true);
    try {
      await resendRegisterToken(data);
      toast.success("Token de registro reenviado!", {
        duration: 10000,
        icon: "✉️",
      });
      router.push("/auth/login");
    } catch (error: any) {
      const apiErrorMessage = error.response?.data?.message;
      toast.error(
        apiErrorMessage ||
          "Erro ao reenviar o token. Tente novamente mais tarde.",
      );
      console.error("Erro ao reenviar o token:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      handleExitComplete={handleExitComplete}
      title="Reenvio de token de registro"
      description="Não recebeu o e-mail de confirmação? Reenvie abaixo para gerar um novo token."
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
            {isSubmitting ? "Reenviando..." : "Reenviar token"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
