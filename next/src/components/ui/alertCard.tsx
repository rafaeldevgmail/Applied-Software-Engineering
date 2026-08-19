import React from "react";
import { AlertTriangle, CheckCircle2, AlertCircle, Info } from "lucide-react";

interface AlertCardProps {
  title?: string;
  children: React.ReactNode;
  type?: "info" | "success" | "danger" | "warning";
  theme?: "default" | "light";
}

export default function AlertCard({
  title,
  children,
  type = "info",
  theme = "default",
}: AlertCardProps) {
  const styles = {
    info: {
      border: "border-sky-500/20",
      bg: "bg-sky-500/10",
      text: "text-sky-600 dark:text-sky-200",
      icon: "text-sky-800 dark:text-sky-400",
      title: "text-sky-800 dark:text-sky-300",
    },
    success: {
      border: "border-emerald-500/20",
      bg: "bg-emerald-500/10",
      text: "text-emerald-600 dark:text-emerald-200",
      icon: "text-emerald-800 dark:text-emerald-400",
      title: "text-emerald-800 dark:text-emerald-300",
    },
    danger: {
      border: "border-red-500/20",
      bg: "bg-red-500/10",
      text: "text-red-600 dark:text-red-200",
      icon: "text-red-800 dark:text-red-400",
      title: "text-red-800 dark:text-red-300",
    },
    warning: {
      border: "border-amber-500/20",
      bg: "bg-amber-500/10",
      text: "text-amber-600 dark:text-amber-200",
      icon: "text-amber-800 dark:text-amber-400",
      title: "text-amber-800 dark:text-amber-300",
    },
  }[type];

  const IconComponent = {
    info: Info,
    success: CheckCircle2,
    danger: AlertTriangle,
    warning: AlertCircle,
  }[type];

  const containerClasses =
    theme === "light"
      ? `flex items-start space-x-3 rounded-lg border p-3.5 backdrop-blur-sm border-white/5 bg-white/5 ${styles.text}`
      : `flex items-start space-x-3 rounded-lg border p-3.5 backdrop-blur-sm ${styles.border} ${styles.bg} ${styles.text}`;

  return (
    <div className={containerClasses}>
      <IconComponent
        className={`h-5 w-5 flex-shrink-0 mt-0.5 animate-pulse ${styles.icon}`}
      />

      <div className="text-sm">
        {title && (
          <span className={`font-semibold block ${styles.title}`}>{title}</span>
        )}
        <div className="opacity-90">{children}</div>
      </div>
    </div>
  );
}
