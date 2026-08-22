"use client";

import * as React from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/utils/utils";

const options = [
  { value: "light", label: "Claro", icon: Sun },
  { value: "dark", label: "Escuro", icon: Moon },
  { value: "system", label: "Sistema", icon: Monitor },
] as const;

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={cn(
        "group inline-flex items-center rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-zinc-100/80 dark:bg-zinc-800/80 p-1 gap-0 glass-pill transition-all duration-300 ease-in-out",
        className,
      )}
      role="group"
      aria-label="Seletor de tema"
    >
      {options.map(({ value, label, icon: Icon }) => {
        const isActive = theme === value;
        return (
          <button
            key={value}
            type="button"
            onClick={() => setTheme(value)}
            aria-pressed={isActive}
            title={label}
            aria-label={label}
            className={cn(
              "flex items-center justify-center rounded-2xl text-zinc-500 dark:text-zinc-400 cursor-pointer overflow-hidden visual-anchor",
              "transition-all duration-300 ease-in-out",
              "hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-white/60 dark:hover:bg-zinc-700/70",
              // Estado padrão (escondido se não for ativo)
              isActive
                ? "w-8 h-7 opacity-100 bg-white/40 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm"
                : "w-0 h-7 opacity-0 pointer-events-none",
              // Estado quando passa o mouse no container (revela todos)
              "group-hover:w-8 group-hover:opacity-100 group-hover:pointer-events-auto group-hover:mx-0.5",
            )}
          >
            <Icon className="w-4 h-4 min-w-4" />
          </button>
        );
      })}
    </div>
  );
}
