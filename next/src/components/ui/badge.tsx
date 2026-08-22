import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  type?: "info" | "success" | "danger" | "warning" | "purple";
  theme?: "default" | "light";
}

export default function Badge({
  children,
  type = "info",
  theme = "default",
}: BadgeProps) {
  const styles = {
    info: {
      bg: "bg-sky-500/10",
      text: "text-sky-400",
      border: "border-sky-500/20",
      dot: "bg-sky-400",
      lightText: "text-sky-500 dark:text-sky-300",
    },
    success: {
      bg: "bg-emerald-500/10",
      text: "text-emerald-400",
      border: "border-emerald-500/20",
      dot: "bg-emerald-400",
      lightText: " text-emerald-500 dark:text-emerald-300",
    },
    danger: {
      bg: "bg-red-500/10",
      text: "text-red-400",
      border: "border-red-500/20",
      dot: "bg-red-400",
      lightText: "text-red-500 dark:text-red-300",
    },
    warning: {
      bg: "bg-amber-500/10",
      text: "text-amber-400",
      border: "border-amber-500/20",
      dot: "bg-amber-400",
      lightText: " text-amber-500 dark:text-amber-300",
    },
    purple: {
      bg: "bg-purple-500/10",
      text: "text-purple-400",
      border: "border-purple-500/20",
      dot: "bg-purple-400",
      lightText: " text-purple-500 dark:text-purple-300",
    },
  }[type];

  if (theme === "light") {
    return (
      <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium backdrop-blur-md">
        <span className={`w-2 h-2 rounded-full ${styles.dot} animate-pulse`} />
        <span className={styles.lightText}>{children}</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${styles.bg} ${styles.text} border ${styles.border} w-max`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${styles.dot} animate-pulse`}
      ></span>
      {children}
    </span>
  );
}
