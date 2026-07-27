"use client";

import { useState } from "react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Input } from "@/components/ui/input"; // Ajuste o caminho do seu Input

interface PasswordFieldProps {
  label: string;
  placeholder?: string;
  error?: FieldError;
  register: UseFormRegisterReturn;
}

export function PasswordField({
  label,
  placeholder = "Digite sua senha",
  error,
  register,
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Input
      {...register}
      type={showPassword ? "text" : "password"}
      label={label}
      placeholder={placeholder}
      error={error?.message}
      leftIcon={<Lock className="w-4 h-4" />}
      rightIcon={
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="p-1 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors cursor-pointer"
          aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      }
    />
  );
}
