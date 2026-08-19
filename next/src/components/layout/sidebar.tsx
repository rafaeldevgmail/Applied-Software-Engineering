"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "next-auth/react";
import {
  faChartPie,
  faFolder,
  faWallet,
  faHardDrive,
  faUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: faChartPie },
  { href: "/dashboard/users", label: "Usuários", icon: faFolder },
  { href: "/dashboard/clients", label: "Clientes", icon: faWallet },
];

export default function Sidebar({ session }: { session?: any }) {
  const pathname = usePathname();

  return (
    <aside className="lg:col-span-2 glass-sidebar flex flex-col justify-between p-4 min-h-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
      {/* Topo: Logo + Links */}
      <div className="space-y-6">
        {/* Header / Logo */}
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/25 ring-1 ring-white/20">
            <FontAwesomeIcon icon={faHardDrive} className="text-base" />
          </div>
          <div className="flex flex-col">
            <h2 className="font-bold text-base tracking-tight leading-tight">
              HDLG
            </h2>
            <span className="text-[11px] font-medium text-zinc-500 tracking-wide">
              Hardware Ltd.
            </span>
          </div>
        </div>

        {/* Navegação */}
        <nav className="space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "text-dark dark:text-white bg-gradient-to-r from-purple-500/20 to-indigo-500/10 border border-purple-500/30 shadow-lg shadow-purple-500/10"
                    : "text-zinc-400 hover:text-zinc-500 dark:hover:text-zinc-100 hover:bg-white/[0.06] border border-transparent"
                }`}
              >
                {/* Indicador de item ativo */}
                {isActive && (
                  <span className="absolute left-0 top-2.5 bottom-2.5 w-1 bg-gradient-to-b from-purple-400 to-indigo-500 rounded-r-full shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                )}

                <FontAwesomeIcon
                  icon={item.icon}
                  className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${
                    isActive
                      ? "text-purple-400"
                      : "text-zinc-400 group-hover:text-zinc-500 dark:group-hover:text-zinc-300"
                  }`}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Rodapé: Perfil de Usuário */}
      <div className="pt-4 border-t border-white/10">
        <div className="flex items-center justify-between p-2 rounded-2xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] transition-colors duration-200">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative shrink-0">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-500 via-indigo-500 to-pink-500 p-[2px] shadow-sm">
                <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center overflow-hidden">
                  {session?.session?.user?.image ? (
                    <img
                      src={session?.session?.user?.image}
                      alt={session?.session?.user?.name ?? "Avatar"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-xs text-zinc-300"
                    />
                  )}
                </div>
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-zinc-950 rounded-full ring-1 ring-emerald-500/50" />
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-semibold truncate leading-tight">
                {session?.session?.user?.name || "Usuário"}
              </h4>
              <span className="text-[11px] block truncate text-zinc-500 font-normal mt-0.5">
                {session?.session?.user?.email || "usuario@email.com"}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="cursor-pointer text-zinc-400 hover:text-red-400 hover:bg-red-500/10 p-2 rounded-xl transition-all duration-200 shrink-0 ml-1"
            onClick={() => signOut()}
            title="Sair"
          >
            <FontAwesomeIcon icon={faRightFromBracket} className="text-xs" />
          </button>
        </div>
      </div>
    </aside>
  );
}
