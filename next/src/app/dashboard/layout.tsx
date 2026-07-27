import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import Footer from "@/components/layout/footer";
interface DashboardProps {
  children?: React.ReactNode;
}

export default function Dashboard({ children }: DashboardProps) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="liquid-orb-1 fixed w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-500 blur-[50px] opacity-40 animate-pulse"></div>
        <div className="liquid-orb-2 fixed w-[280px] h-[280px] md:w-[450px] md:h-[450px] rounded-full bg-gradient-to-r from-blue-400 to-emerald-400 blur-[50px] opacity-30"></div>
        <div className="liquid-orb-3 fixed w-[200px] h-[200px] rounded-full bg-gradient-to-r from-amber-400 to-red-500 blur-[30px] opacity-20"></div>

        <div className="glass-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[750px]">
            <Sidebar />

            <main className="lg:col-span-10 p-6 md:p-8 flex flex-col justify-between">
              <Header
                title="Dashboard"
                subtitle="Resumo das atividades de hoje"
              />
              {children}
              <Footer />
            </main>
          </div>
        </div>
      </main>
    </div>
  );
}
