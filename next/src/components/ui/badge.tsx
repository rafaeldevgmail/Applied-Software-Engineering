// components/Badge.tsx
import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "danger" | "warning";
}

export default function Badge({ children, variant = "default" }: BadgeProps) {
  // Mapeamento de cores baseado na variante
  const variants = {
    default: "status-badge-info",
    success: "status-badge-active",
    danger: "status-badge-danger",
    warning: "status-badge-pending",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
