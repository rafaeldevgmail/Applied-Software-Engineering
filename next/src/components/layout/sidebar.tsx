"use client"; // para usar o Pathname

import Link from "next/link";
import { usePathname } from "next/navigation";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; // Desativa a injeção automática para evitar conflitos
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
export default function Sidebar(session: any) {
  const pathname = usePathname();
  return (
    <aside className="lg:col-span-2 glass-sidebar">
      <div>
        <div className="flex items-center gap-3 mb-8 px-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center  shadow-lg shadow-purple-500/20">
            <FontAwesomeIcon icon={faHardDrive} />
          </div>
          <div>
            <h2 className="font-bold text-lg leading-none ">HDLG</h2>
            <span className="text-xs  font-medium">Hardware Ltd.</span>
          </div>
        </div>

        <nav className="space-y-1.5">
          <Link
            href="/dashboard"
            className={
              pathname === "/dashboard" ? "menu-link-active" : "menu-link"
            }
          >
            <FontAwesomeIcon icon={faChartPie} />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/dashboard/users"
            className={
              pathname === "/dashboard/users" ? "menu-link-active" : "menu-link"
            }
          >
            <FontAwesomeIcon icon={faFolder} />
            <span>Usuários</span>
          </Link>
          <Link
            href="/dashboard/clients"
            className={
              pathname === "/dashboard/clients"
                ? "menu-link-active"
                : "menu-link"
            }
          >
            <FontAwesomeIcon icon={faWallet} />
            <span>Clientes</span>
          </Link>
        </nav>
      </div>

      <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 p-[2px]">
              <div className="w-full h-full rounded-full  flex items-center justify-center overflow-hidden">
                {session?.session?.user?.image ? (
                  <img
                    src={session?.session?.user?.image}
                    alt={session?.session?.user?.name}
                  />
                ) : (
                  <FontAwesomeIcon icon={faUser} />
                )}
              </div>
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#120f24] rounded-full"></span>
          </div>
          <div>
            <h4 className="text-xs font-semibold ">
              {session?.session?.user?.name}
            </h4>
            <span className="text-[10px] ">
              {session?.session?.user?.email}
            </span>
          </div>
        </div>
        <button
          className="cursor-pointer hover: transition-colors duration-200"
          onClick={() => signOut()}
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
      </div>
    </aside>
  );
}
