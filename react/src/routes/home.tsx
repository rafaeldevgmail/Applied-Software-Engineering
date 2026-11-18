import { createFileRoute } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Rocket,
  Mail,
  CheckCircle2,
  ArrowRight,
  Copy,
  Check,
  Code2,
  ShieldCheck,
  Layers,
  Loader2,
  Clock,
  Globe,
  Wrench,
  Component,
  Webhook,
  FileJson2,
  Server,
  Zap,
  Moon,
  Atom,
} from "lucide-react";
import { FaReact } from "react-icons/fa";

export const Route = createFileRoute("/home")({
  component: HomePage,
});

function HomePage() {
  // --- PROGRESSO ---
  const [progressWidth, setProgressWidth] = useState(0);
  const targetProgress = 5;

  // --- EFEITO DE ANIMAÇÃO DA BARRA DE PROGRESSO ---
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressWidth(targetProgress);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Formata números menores que 10 com zero à esquerda
  const formatNumber = (num: number) => String(num).padStart(2, "0");

  // Etapas do projeto para exibição visual
  const milestones = [
    {
      title: "Setup",
      status: "Concluído",
      done: true,
      icon: Wrench,
    },
    {
      title: "Components",
      status: "Em andamento",
      done: false,
      icon: Component,
    },
    {
      title: "Hooks",
      status: "Em andamento",
      done: false,
      icon: Webhook,
    },
    {
      title: "Schemas",
      status: "Em andamento",
      done: false,
      icon: FileJson2,
    },
    {
      title: "Services",
      status: "Em andamento",
      done: false,
      icon: Server,
    },
    {
      title: "Tests & Security",
      status: "Em andamento",
      done: false,
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#07090E] text-slate-100 flex flex-col justify-between overflow-hidden selection:bg-indigo-500/30 selection:text-indigo-200 font-sans">
      {/* --- ELEMENTOS DECORATIVOS DE FUNDO (GRADIENTES E GLOWS) --- */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        {/* Grade sutil de fundo */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        {/* Esferas de luz difusa */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px] animate-pulse" />
        <div
          className="absolute top-1/3 -right-40 w-[30rem] h-[30rem] bg-cyan-500/15 rounded-full blur-[140px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-violet-600/15 rounded-full blur-[128px]" />
      </div>

      {/* --- CABEÇALHO MINIMALISTA --- */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-8 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400 p-[1px] shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-[#0B0E17] rounded-[11px] flex items-center justify-center">
              <FaReact className="w-5 h-5 text-indigo-400 group-hover:rotate-[180deg] transition-transform duration-300 " />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-white leading-none">
              React<span className="text-indigo-400">.</span>Dashboard
            </span>
            <span className="text-[11px] text-slate-500 tracking-widest uppercase mt-0.5">
              Plataforma Digital
            </span>
          </div>
        </div>
      </header>

      {/* --- CONTEÚDO PRINCIPAL CENTRALIZADO --- */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12 max-w-4xl mx-auto w-full text-center">
        {/* Badge de Status Animado */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/20 backdrop-blur-md mb-8 shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
          </span>
          <span className="text-xs sm:text-sm font-medium tracking-wide text-indigo-200">
            Em Breve • Lançamento Oficial
          </span>
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        </div>

        {/* Título Principal & Subtítulo */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-6">
          Ambiente{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent">
            React
          </span>{" "}
          em construção
        </h1>

        <div className="max-w-2xl space-y-4 mb-10 text-base sm:text-lg text-slate-400 leading-relaxed">
          <p>
            Esta é a versão secundária da interface, construída em{" "}
            <strong className="text-slate-200 font-medium">React Router</strong>{" "}
            com foco em performance, modularidade e escalabilidade.
          </p>
          <p>
            Para acessar a aplicação FrontEnd completa, inicie o ambiente na pasta{" "}
            <code className="text-sm bg-slate-800 text-slate-200 px-1.5 py-0.5 rounded">
              /next
            </code>
            . Em breve, esta versão estará totalmente funcional.
          </p>
        </div>

        {/* Barra de Progresso do Desenvolvimento */}
        <div className="w-full max-w-2xl rounded-2xl bg-white/[0.02] border border-white/10 p-5 sm:p-6 backdrop-blur-xl mb-10 text-left">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Rocket className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-semibold text-slate-200">
                Progresso do Desenvolvimento do React
              </span>
            </div>
            <span className="text-sm font-bold text-cyan-400 tabular-nums">
              {progressWidth}%
            </span>
          </div>

          {/* Trilho da barra */}
          <div className="w-full h-2.5 bg-slate-800/80 rounded-full overflow-hidden p-[2px] border border-white/5 mb-5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 transition-all duration-1000 ease-out relative"
              style={{ width: `${progressWidth}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </div>
          </div>

          {/* Etapas (Milestones) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {milestones.map((step) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={step.title}
                  className={`flex items-center gap-3 p-3 rounded-xl border ${
                    step.done
                      ? "bg-emerald-500/[0.04] border-emerald-500/20"
                      : "bg-indigo-500/[0.05] border-indigo-400/20"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      step.done
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "bg-indigo-500/20 text-indigo-300 animate-pulse"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-200">
                      {step.title}
                    </p>
                    <p
                      className={`text-[11px] font-medium ${
                        step.done ? "text-emerald-400" : "text-indigo-300"
                      }`}
                    >
                      {step.status}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Formulário de Captura de Leads ("Avise-me no lançamento") */}
        <div className="w-full max-w-xl">
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <span className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-4 py-2 text-xs font-medium text-slate-300">
              <Zap className="h-3.5 w-3.5 text-amber-400" />
              Alta Performance
            </span>

            <span className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-4 py-2 text-xs font-medium text-slate-300">
              <Layers className="h-3.5 w-3.5 text-purple-400" />
              Arquitetura Modular
            </span>

            <span className="flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-4 py-2 text-xs font-medium text-slate-300">
              <Moon className="h-3.5 w-3.5 text-indigo-400" />
              Dark/Light Mode
            </span>
          </div>
        </div>
      </main>

      {/* --- RODAPÉ E CONTATOS --- */}
      <footer className="mt-auto w-full border-t border-slate-800/60 px-6 py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-xs text-slate-500 sm:flex-row">
          {/* Esquerda: Stack Tecnológica */}
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-purple-400" />
            <span>
              Built with{" "}
              <strong className="font-medium text-slate-300">
                React Router
              </strong>{" "}
              &{" "}
              <strong className="font-medium text-slate-300">TypeScript</strong>
            </span>
          </div>

          {/* Direita: Copyright */}
          <p>© Rafael Bortoletto - Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
