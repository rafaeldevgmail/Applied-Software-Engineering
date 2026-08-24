import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Remove acentos/diacríticos para comparação estável de nomes. */
function removeAccents(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

const NAME_CONNECTIVES = new Set([
  "da",
  "de",
  "do",
  "das",
  "dos",
  "e",
  "di",
  "del",
  "della",
  "van",
  "von",
  "der",
  "den",
  "jr",
  "filho",
  "neto",
]);

export function getInitials(name: string): string {
  if (!name || !name.trim()) return "";

  // Palavras de ligação não entram nas iniciais (ex.: "Maria da Silva" -> "MS")
  const words = name.trim().split(/\s+/);
  const meaningful = words.filter(
    (word) => !NAME_CONNECTIVES.has(removeAccents(word).toLowerCase()),
  );
  const candidates = meaningful.length > 0 ? meaningful : words;

  const first = candidates[0].charAt(0);
  const last =
    candidates.length > 1 ? candidates[candidates.length - 1].charAt(0) : "";

  return `${first}${last}`.toUpperCase();
}

/**
 * Hash estável (djb2) sobre o nome normalizado: garante que a mesma pessoa
 * ou cliente receba sempre a mesma cor, em qualquer página ou sessão.
 */
function colorSeed(name: string): number {
  const seed = removeAccents(name).trim().toLowerCase();
  let hash = 5381;
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) + hash + seed.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

/** Tom visual aplicado ao avatar de iniciais (classes Tailwind completas). */
export interface InitialsTone {
  container: string;
}

// Usuários: duotone suave (fundo translúcido + texto colorido) — linguagem de "pessoa"
const USER_TONES: InitialsTone[] = [
  {
    container:
      "bg-violet-500/20 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300 ring-1 ring-inset ring-violet-500/30",
  },
  {
    container:
      "bg-sky-500/20 text-sky-600 dark:bg-sky-500/15 dark:text-sky-300 ring-1 ring-inset ring-sky-500/30",
  },
  {
    container:
      "bg-emerald-500/20 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-300 ring-1 ring-inset ring-emerald-500/30",
  },
  {
    container:
      "bg-amber-500/20 text-amber-600 dark:bg-amber-500/15 dark:text-amber-300 ring-1 ring-inset ring-amber-500/30",
  },
  {
    container:
      "bg-rose-500/20 text-rose-600 dark:bg-rose-500/15 dark:text-rose-300 ring-1 ring-inset ring-rose-500/30",
  },
  {
    container:
      "bg-indigo-500/20 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300 ring-1 ring-inset ring-indigo-500/30",
  },
];

// Clientes: gradiente sólido com texto branco — linguagem de "marca"
const CLIENT_TONES: InitialsTone[] = [
  {
    container:
      "bg-violet-500/20 text-violet-600 dark:bg-violet-500/15 dark:text-fuchsia-300 ring-1 ring-inset ring-fuchsia-500/30",
  },
  {
    container:
      "bg-sky-500/20 text-sky-600 dark:bg-sky-500/15 dark:text-indigo-300  ring-1 ring-inset ring-indigo-500/30",
  },
  {
    container:
      "bg-emerald-500/20 text-emerald-600 dark:bg-emerald-500/15 dark:text-teal-300 ring-1 ring-inset ring-teal-500/30",
  },
  {
    container:
      "bg-amber-500/20 text-amber-600 dark:bg-amber-500/15 dark:text-orange-300 ring-1 ring-inset ring-orange-500/30",
  },
  {
    container:
      "bg-rose-500/20 text-rose-600 dark:bg-rose-500/15 dark:text-pink-300 ring-1 ring-inset ring-pink-500/30",
  },
  {
    container:
      "bg-cyan-500/20 text-cyan-600 dark:bg-cyan-500/15 dark:text-blue-300 ring-1 ring-inset ring-blue-500/30",
  },
];

function pickTone(tones: InitialsTone[], name: string): InitialsTone {
  if (!name || !name.trim()) return tones[0];
  return tones[colorSeed(name) % tones.length];
}

export function getUserInitialsTone(name: string): InitialsTone {
  return pickTone(USER_TONES, name);
}

export function getClientInitialsTone(name: string): InitialsTone {
  return pickTone(CLIENT_TONES, name);
}
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
