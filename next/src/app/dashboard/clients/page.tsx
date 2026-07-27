import { getClients } from "@/services/clientService";
import Link from "next/link";
import { formatDate, getInitials } from "@/utils/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faPen,
  faTrash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { ClientFormModal } from "@/components/features/clients/client-form-modal";
import { ClientViewModal } from "@/components/features/clients/client-view-modal";
import { DeleteConfirmModal } from "@/components/features/clients/delete-confirm-modal";
interface PageProps {
  searchParams: Promise<{
    modal?: string;
    editId?: string;
    deleteId?: string;
    viewId?: string;
  }>;
}
export default async function ClientsListPage({ searchParams }: PageProps) {
  const { modal, editId, deleteId, viewId } = await searchParams;
  const { data: clients, total: totalClientes } = await getClients();

  const findClient = (id) =>
    id && clients ? clients.find((client) => client.id === Number(id)) : null;

  const clientToView = findClient(viewId);
  const clientToEdit = findClient(editId);
  const clientToDelete = findClient(deleteId);

  const isModalOpen = modal === "true" || !!editId;

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      {/* Cabeçalho do CRUD */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-wide">Clientes</h1>
          <p className="text-sm ">Gerencie os clientes</p>
        </div>

        {/* Botão Novo Cliente */}
        <Link href="/dashboard/clients?modal=true">
          <button className="cursor-pointer flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-500/20 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 text-sm">
            <FontAwesomeIcon icon={faPlus} />
            Novo Cliente
          </button>
        </Link>
        {isModalOpen && <ClientFormModal clientToEdit={clientToEdit} />}
        {!!clientToView && <ClientViewModal clientToView={clientToView} />}
        {!!clientToDelete && (
          <DeleteConfirmModal
            clientId={clientToDelete.id}
            clientName={clientToDelete.name}
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
              {clients?.map((client) => (
                <tr
                  key={client.id}
                  className="hover:bg-white/[0.2] transition-colors duration-150 group"
                >
                  {/* Nome (com avatar) */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-semibold text-xs shadow-inner">
                        {getInitials(client.name)}
                      </div>
                      <div>
                        <div className="font-medium">{client.name}</div>
                      </div>
                    </div>
                  </td>

                  {/* E-mail */}
                  <td className="px-6 py-4 whitespace-nowrap ">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-violet-500/10 text-violet-800 dark:bg-violet-500/50 dark:text-violet-200 border border-violet-500/20">
                      {client.email}
                    </span>
                  </td>

                  {/* Criado em */}
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatDate(client.createdAt)}
                  </td>

                  {/* Ações */}
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <div className="flex items-center justify-center gap-2">
                      {/* Botão Editar */}
                      <Link
                        href={`/dashboard/clients?editId=${client.id}`}
                        className="cursor-pointer bg-green-600 p-1.5 rounded-lg text-white hover:bg-green-700 transition-all"
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </Link>

                      {/* Botão Excluir */}
                      <Link
                        href={`/dashboard/clients?deleteId=${client.id}`}
                        className="cursor-pointer bg-rose-600 p-1.5 rounded-lg text-white hover:bg-rose-700 transition-all"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Link>
                      <Link
                        href={`/dashboard/clients?viewId=${client.id}`}
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
            Exibindo <b>{totalClientes}</b> de <b>{totalClientes}</b> cliente(s)
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
