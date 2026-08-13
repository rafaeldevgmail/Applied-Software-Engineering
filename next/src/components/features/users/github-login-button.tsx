"use client";

import React from "react";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";

export function GithubLoginButton() {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleGithubLogin = async () => {
    setIsLoading(true);
    try {
      await signIn("github", { callbackUrl: "/dashboard" });
    } catch (error) {
      console.error("Erro ao fazer login com o GitHub:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleGithubLogin}
      disabled={isLoading}
      className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 cursor-pointer"
    >
      <FaGithub className="w-5 h-5" />
      {isLoading ? "Entrando..." : "Entrar com GitHub"}
    </button>
  );
}
