import { UserResetPasswordModal } from "@/components/features/users/user-reset-password-modal";

interface PageProps {
  searchParams: Promise<{
    modal?: string;
    email?: string;
    token?: string;
  }>;
}

export default async function ResetPasswordPage({ searchParams }: PageProps) {
  const { modal, email, token } = await searchParams;

  const isModalOpen = modal === "true";

  return (
    <div className="w-full max-w-5xl mx-auto sm:p-0 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        {<UserResetPasswordModal email={email} token={token} />}
      </div>
    </div>
  );
}
