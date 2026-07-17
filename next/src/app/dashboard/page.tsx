import { Utils } from "@/utils/utils";
import { User } from "@/types/user";
import Badge from "@/components/ui/badge";
import { getUsers } from "@/services/userService";
export default async function DashboardPage() {
  const result = await getUsers();
  const users = result.data as User[];
  const totalUsuarios = result.total;

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
      <div className="lg:col-span-6 glass-card flex flex-col justify-between">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold ">Usuários</h3>
            <Badge variant="default">{totalUsuarios}</Badge>
          </div>
          <button className="cursor-pointer text-xs text-purple-400 hover:text-purple-300 font-semibold transition-colors">
            Ver todos
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
                    {Utils.getInitials(user.name)}
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
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/2 border border-white/5 hover:bg-white/5 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400 font-bold text-sm">
                {Utils.getInitials("Design System")}
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
          </div>
        </div>
      </div>
      <div className="lg:col-span-6 glass-card flex flex-col justify-between">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold ">Clientes</h3>
            <Badge variant="default">{totalUsuarios}</Badge>
          </div>
          <button className="cursor-pointer text-xs text-purple-400 hover:text-purple-300 font-semibold transition-colors">
            Ver todos
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-xl bg-white/2 border border-white/5 hover:bg-white/5 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-400 font-bold text-sm">
                DS
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
          </div>
        </div>
      </div>
    </section>
  );
}
