// "use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";
import { User } from "@/types/user"; // Importe a tipagem do usuário
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginUserSchema, LoginUserFormData } from "@/schemas/userSchema"; // Importe o schema de validação
import { loginUser } from "@/services/userService";
import { toast } from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";
import { PasswordField } from "@/components/ui/password-field";

export function UserLoginModal() {
  const router = useRouter();
  const { handleClose, overlayAnim, dialogAnim } = useModal({
    canClose: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit: formHandleSubmit,
    formState: { errors },
  } = useForm<LoginUserFormData>({
    resolver: zodResolver(LoginUserSchema),
  });
  console.log("Erros de validação do formulário:", errors);

  const isEditMode = Boolean();

  const onSubmit = async (data: LoginUserFormData) => {
    setIsSubmitting(true);
    try {
      await loginUser(data);
      toast.success("Login efetuado com sucesso!");

      handleClose();
      //vai para a página de login
      router.push("/dashboard");
    } catch (error: any) {
      const apiErrorMessage = error.response?.data?.message;

      toast.error(
        apiErrorMessage ||
          "Erro ao efetuar o login. Tente novamente mais tarde.",
      );
      console.error("Erro ao efetuar o login:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      handleClose={handleClose}
      overlayAnim={overlayAnim}
      dialogAnim={dialogAnim}
      title="Login"
      description="Preencha os dados do usuário."
      canClose={false}
    >
      <form onSubmit={formHandleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">E-mail</label>
          <input
            type="email"
            {...register("email")}
            className={`w-full p-2 border focus:outline-none focus:border-purple-500 rounded-lg bg-transparent ${errors.email ? "border-red-500" : "border-black-300"}`}
            placeholder="john@example.com"
          />

          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Campo Senha */}
        <PasswordField
          label="Senha"
          placeholder="Digite sua senha"
          error={errors.password as any}
          register={register("password")}
        />

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium bg-purple-600 text-white rounded-lg hover:bg-purple-500 disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? "Efetuando Login..." : "Login"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
