import { redirect } from "next/navigation";
import { auth } from "@/auth";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import Footer from "@/components/layout/footer";
import Badge from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
interface DashboardProps {
  children?: React.ReactNode;
}

export default async function Dashboard({ children }: DashboardProps) {
  const session = await auth();
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="liquid-orb-1 fixed w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500 blur-[50px] opacity-40 animate-pulse"></div>
        <div className="liquid-orb-2 fixed w-[280px] h-[280px] md:w-[450px] md:h-[450px] rounded-full bg-gradient-to-r from-blue-400 to-emerald-400 blur-[50px] opacity-30"></div>
        <div className="liquid-orb-3 fixed w-[200px] h-[200px] rounded-full bg-gradient-to-r from-amber-400 to-red-500 blur-[30px] opacity-20"></div>

        <div className="glass-container">
          <div
            className={`grid grid-cols-1 ${session ? "lg:grid-cols-12" : ""}  min-h-[750px]`}
          >
            {session && <Sidebar session={session} />}

            <main className="lg:col-span-10 p-6 md:p-8 flex flex-col justify-between ">
              <Header
                title="Dashboard"
                subtitle="Resumo das atividades de hoje"
              />
              {children || (
                <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-12 max-w-3xl mx-auto space-y-6">
                  <Badge type="purple" theme="light">
                    Plataforma em Versão Beta
                  </Badge>

                  {/* Título Principal */}
                  <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
                    Gerencie suas atividades com <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-emerald-400">
                      simplicidade e controle
                    </span>
                  </h1>

                  {/* Texto Introdutório */}
                  <p className=" text-base sm:text-lg max-w-xl font-normal leading-relaxed">
                    Produtividade inteligente construída com tecnologia de ponta
                  </p>

                  {/* Botões de Ação (Login e Cadastro) */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full justify-center max-w-sm">
                    {/* Link / Botão Principal de Login */}
                    <a
                      href="auth/login"
                      className="w-full sm:w-auto bg-purple-600 hover:bg-purple-500 text-white font-semibold px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-purple-500/25 text-sm flex items-center justify-center gap-2"
                    >
                      Efetuar Login
                      <ArrowRight className="w-4 h-4" />
                    </a>

                    {/* Botão Secundário */}
                    {/* <button className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border border-white/10 font-semibold px-6 py-3 rounded-xl backdrop-blur-md transition text-sm">
                    Conhecer Recursos
                  </button> */}
                  </div>

                  {/* Rodapé Interno / Prova Social */}
                  <div className="pt-8 flex items-center justify-center gap-4 text-xs text-gray-400 border-t border-white/10 w-full max-w-md">
                    <span>⚡ Acesso Instantâneo</span>
                    <span>•</span>
                    <span>🔒 100% Seguro</span>
                  </div>
                </div>
              )}
              <Footer />
            </main>
          </div>
        </div>
      </main>
    </div>
  );
}
