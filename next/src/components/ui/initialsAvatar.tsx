import { Building2, User } from "lucide-react";
import {
  cn,
  getClientInitialsTone,
  getInitials,
  getUserInitialsTone,
} from "@/utils/utils";

type InitialsVariant = "user" | "client";
type InitialsSize = "sm" | "md";

interface InitialsAvatarProps {
  name: string;
  /** "user": duotone quadrado | "client": gradiente circular */
  variant?: InitialsVariant;
  size?: InitialsSize;
  className?: string;
}

const BASE_CLASSES =
  "flex shrink-0 select-none items-center justify-center overflow-hidden font-semibold tracking-wide leading-none";

const SIZE_CLASSES: Record<InitialsSize, string> = {
  sm: "h-9 w-9 text-[11px]",
  md: "h-10 w-10 text-xs",
};

const ICON_CLASSES: Record<InitialsSize, string> = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
};

export function InitialsAvatar({
  name,
  variant = "user",
  size = "md",
  className,
}: InitialsAvatarProps) {
  const initials = getInitials(name);

  const variantClasses =
    variant === "client"
      ? cn(
          // Padrão cliente: círculo com gradiente sólido e texto branco
          "rounded-full bg-gradient-to-br shadow-sm shadow-black/20 ring-1 ring-white/20 ",
          getClientInitialsTone(name).container,
        )
      : cn(
          // Padrão usuário: quadrado arredondado duotone translúcido
          "rounded-xl ring-inset backdrop-blur-sm shadow-sm shadow-black/20 ",
          getUserInitialsTone(name).container,
        );

  const FallbackIcon = variant === "client" ? Building2 : User;

  return (
    <div
      className={cn(
        BASE_CLASSES,
        SIZE_CLASSES[size],
        variantClasses,
        className,
      )}
      title={name}
    >
      {initials || <FallbackIcon className={ICON_CLASSES[size]} />}
    </div>
  );
}
