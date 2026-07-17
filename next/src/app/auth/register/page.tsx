import { UserRegisterModal } from "@/components/features/users/user-register-modal";
interface PageProps {
  searchParams: Promise<{
    modal?: string;
  }>;
}

export default async function UsersRegisterPage({ searchParams }: PageProps) {
  const { modal } = await searchParams;

  const isModalOpen = modal === "true";

  return (
    <div className="w-full max-w-5xl mx-auto p-6">
      {/* Cabeçalho do CRUD */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        {<UserRegisterModal />}
      </div>
    </div>
  );
}
