"use client";

import { useState } from "react";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

interface PasswordFieldProps {
  label: string;
  placeholder: string;
  error?: string;
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
    <div className="w-full">
      <label className="block text-sm font-medium mb-1">{label}</label>

      <div className="flex items-center relative">
        <input
          type={showPassword ? "text" : "password"}
          {...register}
          placeholder={placeholder}
          className={`w-full p-2 pr-10 border bg-transparent rounded-lg text-black dark:text-white focus:outline-none focus:border-purple-500 transition-colors ${
            error ? "border-red-500" : "border-black-300"
          }`}
        />

        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-2 p-2 focus:outline-none cursor-pointer"
          aria-label={showPassword ? "Esconder senha" : "Mostrar senha"}
        >
          {showPassword ? (
            <Eye className="w-5 h-5 text-current" />
          ) : (
            <EyeOff className="w-5 h-5 text-current" />
          )}
        </button>
      </div>

      {error?.message && (
        <p className="text-red-500 text-sm mt-1">{error.message}</p>
      )}
    </div>
  );
}
