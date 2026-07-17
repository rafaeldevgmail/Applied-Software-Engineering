import Dashboard from "@/app/dashboard/layout";
import { getUsers } from "@/services/userService";
// Força a atualização da página a cada requisição, garantindo dados sempre atualizados
export const dynamic = "force-dynamic";

export default async function Home() {
  const users = await getUsers();
  return <Dashboard users={users.data} totalUsuarios={users.total} />;
}
