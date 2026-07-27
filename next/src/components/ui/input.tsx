import * as React from "react";
import { cn } from "@/utils/utils"; // Função com clsx + tailwind-merge

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      containerClassName,
      type = "text",
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      id,
      disabled,
      ...props
    },
    ref,
  ) => {
    // Gera um ID único se nenhum for passado (Garante A11y para o label)
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;

    return (
      <div className={cn("w-full space-y-1.5 text-left", containerClassName)}>
        {/* Label do Input */}
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "block uppercase text-xs font-medium text-zinc-500 dark:text-zinc-400 tracking-wider ",
              disabled && "opacity-50 cursor-not-allowed",
            )}
          >
            {label}
          </label>
        )}

        {/* Wrapper do Input com Suporte a Ícones */}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="w-4 h-4 absolute left-3 flex items-center justify-center text-zinc-500 pointer-events-none">
              {leftIcon}
            </div>
          )}

          <input
            id={inputId}
            type={type}
            ref={ref}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            className={cn(
              // Estilos Base
              "w-full rounded-lg text-sm transition-all duration-200 ease-in-out",
              "bg-zinc-100/60 dark:bg-zinc-800/60 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400",
              "border border-zinc-200/80 dark:border-zinc-700/60",
              "py-2.5 px-3.5",

              // Estados de Foco Padrão
              "focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500",

              // Ajuste de Padding para os Ícones
              leftIcon && "pl-10",
              rightIcon && "pr-10",

              // Sobrescrita para Estado de Erro
              error && [
                "border-red-500 dark:border-red-500",
                "focus:border-red-500 focus:ring-red-500/20",
                "placeholder:text-red-300 dark:placeholder:text-red-400/60",
              ],

              // Estado Desabilitado
              disabled &&
                "opacity-50 cursor-not-allowed bg-zinc-200/50 dark:bg-zinc-800/30",

              className,
            )}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3 flex items-center justify-center text-zinc-400 ">
              {rightIcon}
            </div>
          )}
        </div>

        {/* Mensagem de Erro ou Texto de Ajuda */}
        {error ? (
          <p
            id={errorId}
            className="text-xs text-red-500 font-medium animate-in fade-in-50"
          >
            {error}
          </p>
        ) : helperText ? (
          <p id={helperId} className="text-xs text-zinc-500 dark:text-zinc-400">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";
