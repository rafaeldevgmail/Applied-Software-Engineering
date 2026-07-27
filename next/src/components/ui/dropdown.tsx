"use client";

import * as React from "react";
import { ChevronDown, Check, Search, X } from "lucide-react";
import { cn } from "@/utils/utils";

export interface DropdownOption<T = string | number> {
  label: string;
  value: T;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface DropdownProps<T = string | number> {
  label?: string;
  options: DropdownOption<T>[];
  value?: T;
  onChange?: (value: T) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  disabled?: boolean;
  searchable?: boolean;
  className?: string;
  containerClassName?: string;
}

export function Dropdown<T extends string | number>({
  label,
  options,
  value,
  onChange,
  placeholder = "Selecione...",
  searchPlaceholder = "Buscar...",
  error,
  helperText,
  leftIcon,
  disabled = false,
  searchable = false,
  className,
  containerClassName,
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  const containerRef = React.useRef<HTMLDivElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  // Filtra as opções se a busca estiver ativa e houver termo digitado
  const filteredOptions = React.useMemo(() => {
    if (!searchable || !searchTerm.trim()) return options;
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [options, searchTerm, searchable]);

  // Opção atualmente selecionada
  const selectedOption = options.find((option) => option.value === value);

  // Foco automático no input de busca ao abrir (apenas se searchable = true)
  React.useEffect(() => {
    if (isOpen && searchable) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    } else {
      setSearchTerm(""); // Reseta o termo ao fechar
    }
  }, [isOpen, searchable]);

  // Fecha ao clicar fora ou pressionar ESC
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSelect = (option: DropdownOption<T>) => {
    if (option.disabled) return;
    onChange?.(option.value);
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={cn("w-full text-left relative ", containerClassName)}
    >
      {/* Label */}
      {label && (
        <label
          htmlFor={searchInputRef.current?.id}
          className={cn(
            "block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400",
            disabled && "opacity-50 cursor-not-allowed",
          )}
        >
          {label}
        </label>
      )}

      {/* Botão Gatilho (Trigger) */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className={cn(
          "w-full flex items-center justify-between gap-2 py-2 px-3 rounded-lg text-sm transition-all duration-200 cursor-pointer text-left",
          "bg-zinc-100/60 dark:bg-zinc-800/60 text-zinc-900 dark:text-zinc-100",
          "border border-zinc-200/80 dark:border-zinc-700/60",
          "focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500",

          !selectedOption && "text-zinc-400 dark:text-zinc-400",

          error && [
            "border-red-500 dark:border-red-500",
            "focus:border-red-500 focus:ring-red-500/20",
          ],

          disabled &&
            "opacity-50 cursor-not-allowed bg-zinc-200/50 dark:bg-zinc-800/30",

          className,
        )}
      >
        <div className="flex items-center gap-2 truncate">
          {leftIcon && (
            <span className="text-zinc-400 shrink-0">{leftIcon}</span>
          )}
          {selectedOption?.icon && (
            <span className="shrink-0">{selectedOption.icon}</span>
          )}
          <span className="truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>

        <ChevronDown
          className={cn(
            "w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200",
            isOpen && "rotate-180 text-indigo-500",
          )}
        />
      </button>

      {/* Menu Suspenso (Dropdown List) */}
      {isOpen && (
        <div
          className={cn(
            "absolute z-50 w-full mt-1 rounded-md p-1 shadow-2xl overflow-hidden scrollbar-track-transparent scrollbar-thumb-zinc-500",
            "bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800",
            "animate-in fade-in-0 zoom-in-95 duration-100",
          )}
        >
          {/* Campo de Busca Interno (Exibido apenas se searchable === true) */}
          {searchable && (
            <div className="p-1 mb-1 border-b border-zinc-100 dark:border-zinc-800/80">
              <div className="relative flex items-center">
                <Search className="w-3.5 h-3.5 absolute left-2.5 text-zinc-400 pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="w-full pl-8 pr-7 py-1.5 text-xs rounded-md bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-700/50 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="absolute right-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Lista com Rolagem Limitada e Itens Compactos */}
          <ul className="max-h-48 overflow-y-auto space-y-0.5 pr-0.5 scrollbar-thin">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
                const isSelected = option.value === value;

                return (
                  <li key={String(option.value)} className="py-0">
                    <button
                      type="button"
                      disabled={option.disabled}
                      onClick={() => handleSelect(option)}
                      className={cn(
                        "w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition-colors cursor-pointer text-left",
                        "hover:bg-zinc-100 dark:hover:bg-zinc-800/70 text-zinc-700 dark:text-zinc-200",

                        isSelected &&
                          "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-medium",

                        option.disabled &&
                          "opacity-40 cursor-not-allowed hover:bg-transparent",
                      )}
                    >
                      <div className="flex items-center gap-2 truncate">
                        {option.icon && (
                          <span className="shrink-0">{option.icon}</span>
                        )}
                        <span className="truncate">{option.label}</span>
                      </div>

                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-indigo-500 shrink-0 ml-1.5" />
                      )}
                    </button>
                  </li>
                );
              })
            ) : (
              <li className="py-4 text-center text-xs text-zinc-400">
                Nenhum resultado encontrado.
              </li>
            )}
          </ul>
        </div>
      )}

      {/* Mensagem de Erro / Helper */}
      {error ? (
        <p className="text-xs text-red-500 font-medium animate-in fade-in-50">
          {error}
        </p>
      ) : helperText ? (
        <p className="text-xs text-zinc-500 dark:text-zinc-400">{helperText}</p>
      ) : null}
    </div>
  );
}
