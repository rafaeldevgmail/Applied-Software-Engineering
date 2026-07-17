import { getUsers } from "@/services/userService";
import Link from "next/link";
import { Utils } from "@/utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPen,
  faTrash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { UserFormModal } from "@/components/features/users/user-form-modal";
import { UserViewModal } from "@/components/features/users/user-view-modal";
import { DeleteConfirmModal } from "@/components/features/users/delete-confirm-modal";
interface PageProps {
  searchParams: Promise<{
    modal?: string;
    editId?: string;
    deleteId?: string;
    viewId?: string;
  }>;
}
export default async function UsersListPage({ searchParams }: PageProps) {
  const { modal, editId, deleteId, viewId } = await searchParams;
  const users = await getUsers();

  const userToView = viewId
    ? users.data.find((user) => user.id === Number(viewId))
    : null;
  // Encontra o usuário caso exista um editId na URL
  const userToEdit = editId
    ? users.data.find((user) => user.id === Number(editId))
    : null;
  const userToDelete = deleteId
    ? users.data.find((user) => user.id === Number(deleteId))
    : null;

  const isModalOpen = modal === "true" || !!editId;

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      {/* Cabeçalho do CRUD */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-wide">Usuários</h1>
          <p className="text-sm ">Gerencie os usuários</p>
        </div>

        {/* Botão Novo Usuário */}
        {/* <Link href="/dashboard/users?modal=true"> */}
        <Link href="/auth/register">
          <button className="cursor-pointer flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-500/20 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 text-sm">
            <FontAwesomeIcon icon={faPlus} />
            Novo Usuário
          </button>
        </Link>
        {isModalOpen && <UserFormModal userToEdit={userToEdit} />}
        {!!userToView && <UserViewModal userToView={userToView} />}
        {!!userToDelete && (
          <DeleteConfirmModal
            userId={userToDelete.id}
            userName={userToDelete.name}
          />
        )}
      </div>

      {/* Container da Tabela com Efeito Glassmorphism */}
      <div className="glass-container">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm ">
            {/* Headers */}
            <thead className="bg-white/[0.02] border-b border-white/10 text-xs font-semibold uppercase tracking-wide text-slate-400">
              <tr>
                <th scope="col" className="px-6 py-4">
                  Nome
                </th>
                <th scope="col" className="px-6 py-4">
                  E-mail
                </th>
                <th scope="col" className="px-6 py-4">
                  Criado em
                </th>
                <th scope="col" className="px-6 py-4 text-center">
                  Ações
                </th>
              </tr>
            </thead>

            {/* Corpo da Tabela */}
            <tbody className="divide-y divide-white/5">
              {users.data.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-white/[0.2] transition-colors duration-150 group"
                >
                  {/* Nome (com avatar) */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-semibold text-xs shadow-inner">
                        {Utils.getInitials(user.name)}
                      </div>
                      <div>
                        <div className="font-medium">{user.name}</div>
                      </div>
                    </div>
                  </td>

                  {/* E-mail */}
                  <td className="px-6 py-4 whitespace-nowrap ">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-violet-500/10 text-violet-800 dark:bg-violet-500/50 dark:text-violet-200 border border-violet-500/20">
                      {user.email}
                    </span>
                  </td>

                  {/* Criado em */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {Utils.formatDate(user.createdAt)}
                  </td>

                  {/* Ações */}
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <div className="flex items-center justify-center gap-2">
                      {/* Botão Editar */}
                      <Link
                        href={`/dashboard/users?editId=${user.id}`}
                        className="cursor-pointer bg-green-600 p-1.5 rounded-lg text-white hover:bg-green-700 transition-all"
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </Link>

                      {/* Botão Excluir */}
                      <Link
                        href={`/dashboard/users?deleteId=${user.id}`}
                        className="cursor-pointer bg-rose-600 p-1.5 rounded-lg text-white hover:bg-rose-700 transition-all"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Link>
                      <Link
                        href={`/dashboard/users?viewId=${user.id}`}
                        className="cursor-pointer bg-blue-600 p-1.5 rounded-lg text-white hover:bg-blue-700 transition-all"
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Paginação / Rodapé */}
        <div className="px-6 py-4 bg-white/[0.01] border-t border-white/5 flex items-center justify-between flex-wrap gap-4 text-xs text-slate-400">
          <span>
            Exibindo <b>3</b> de <b>3</b> usuários
          </span>
          <div className="flex items-center gap-2">
            <button
              className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white disabled:opacity-40 disabled:hover:bg-white/5 transition"
              disabled
            >
              Anterior
            </button>
            <button
              className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 text-white disabled:opacity-40 disabled:hover:bg-white/5 transition"
              disabled
            >
              Próximo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
