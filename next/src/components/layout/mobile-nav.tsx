"use client";

import Link from "next/link";
import { NAV_ITEMS } from "@/components/layout/sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartPie,
  faFolder,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { pathname } from "next/navigation";

export default function MobileNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm safe-area-bottom">
      <div className="flex items-center justify-around h-16">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 min-w-[64px] ${
                isActive
                  ? "text-purple-500 dark:text-purple-400"
                  : "text-zinc-400 dark:text-zinc-500 active:text-zinc-600 dark:active:text-zinc-300"
              }`}
            >
              {
                <FontAwesomeIcon
                  icon={item.icon}
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? "scale-110" : ""
                  }`}
                />
              }
              <span className="text-[10px] font-medium">{item.label}</span>
              {isActive && (
                <span className="absolute bottom-1 w-6 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-500 rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
