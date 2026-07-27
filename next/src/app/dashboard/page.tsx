import { getInitials } from "@/utils/utils";
import { User } from "@/types/user";
import Badge from "@/components/ui/badge";
import { getUsers } from "@/services/userService";
import { getClients } from "@/services/clientService";
import Link from "next/link";
export default async function DashboardPage() {
  const { data: users, total: totalUsuarios } = await getUsers();
  const { data: clients, total: totalClientes } = await getClients();

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
      <div className="lg:col-span-6 glass-card flex flex-col justify-top">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold ">Usuários</h3>
            <Badge variant="default">{totalUsuarios}</Badge>
          </div>
          <button className="cursor-pointer text-xs text-purple-400 hover:text-purple-300 font-semibold transition-colors">
            <Link href="/dashboard/users">Ver todos</Link>
          </button>
        </div>

        <div className="space-y-4 ">
          {/* se existir users */}
          {users && users.length > 0 ? (
            users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 rounded-xl bg-white/2 border border-white/5 hover:bg-white/5 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-sm">
                    {getInitials(user.name)}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold ">{user.name}</h4>
                    <p className="text-[10px] ">{user.email}</p>
                  </div>
                </div>
                <span className="status-badge-active">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>{" "}
                  Ativo
                </span>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center p-3 rounded-xl bg-white/2 border border-white/5 hover:bg-white/5 transition-all">
              <p className="text-sm font-semibold text-gray-500">
                Nenhum usuário encontrado.
              </p>
            </div>
          )}
          {/* <div className="flex items-center justify-between p-3 rounded-xl bg-white/2 border border-white/5 hover:bg-white/5 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400 font-bold text-sm">
                {getInitials("Design System")}
              </div>
              <div>
                <h4 className="text-sm font-semibold ">Design System</h4>
                <p className="text-[10px] ">Atualizado há 2 horas</p>
              </div>
            </div>
            <span className="status-badge-pending">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>{" "}
              Pendente
            </span>
          </div> */}
        </div>
      </div>
      <div className="lg:col-span-6 glass-card flex flex-col justify-top">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold ">Clientes</h3>
            <Badge variant="default">{totalClientes}</Badge>
          </div>
          <button className="cursor-pointer text-xs text-purple-400 hover:text-purple-300 font-semibold transition-colors">
            <Link href="/dashboard/clients">Ver todos</Link>
          </button>
        </div>

        <div className="space-y-4">
          {/* se existir clientes */}
          {clients && clients.length > 0 ? (
            clients.map((client) => (
              <div
                key={client.id}
                className="flex items-center justify-between p-3 rounded-xl bg-white/2 border border-white/5 hover:bg-white/5 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold text-sm">
                    {getInitials(client.name)}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold ">{client.name}</h4>
                    <p className="text-[10px] ">{client.email}</p>
                  </div>
                </div>
                <span className="status-badge-active">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>{" "}
                  Ativo
                </span>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center p-3 rounded-xl bg-white/2 border border-white/5 hover:bg-white/5 transition-all">
              <p className="text-sm font-semibold text-gray-500">
                Nenhum usuário encontrado.
              </p>
            </div>
          )}
          {/* <div className="flex items-center justify-between p-3 rounded-xl bg-white/2 border border-white/5 hover:bg-white/5 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400 font-bold text-sm">
                {getInitials("Design System")}
              </div>
              <div>
                <h4 className="text-sm font-semibold ">Design System</h4>
                <p className="text-[10px] ">Atualizado há 2 horas</p>
              </div>
            </div>
            <span className="status-badge-pending">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>{" "}
              Pendente
            </span>
          </div> */}
        </div>
      </div>
    </section>
  );
}
