import Dashboard from "@/app/dashboard/layout";
// Força a atualização da página a cada requisição, garantindo dados sempre atualizados
export const dynamic = "force-dynamic";

export default async function Home() {
  return <Dashboard />;
}
