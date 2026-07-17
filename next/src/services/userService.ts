import { log } from "console";
import { User } from "@/types/user";

// Detecta se o código está rodando no navegador ou no servidor do Next.js
const API_URL =
  typeof window !== "undefined"
    ? process.env.NEXT_PUBLIC_BACKEND_API_URL
    : process.env.BACKEND_API_URL;

export async function getUsers() {
  try {
    const response = await fetch(`${API_URL}/users`, {
      cache: "no-store", // Ou 'force-cache' dependendo da estratégia
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error("Erro ao buscar usuários:", error);
    throw error; // Repassa o erro para a View tratar se necessário
  }
}

export async function getUserById(id: string) {
  const response = await fetch(`${API_URL}/users/${id}`);
  return response.json();
}

export async function createUser(data: Omit<User, "id">) {
  console.log(JSON.stringify(data));
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Erro ao criar usuário: ${response.status}`);
  }

  return response.json();
}

export async function loginUser(data: Omit<User, "id">) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Erro ao logar usuário: ${response.status}`);
  }

  return response.json();
}

export async function updateUser(id: number, data: Omit<User, "id">) {
  console.log(JSON.stringify(data));
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Erro ao atualizar usuário: ${response.status}`);
  }

  return response.json();
}

export async function deleteUser(id: number) {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Erro ao deletar usuário: ${response.status}`);
  }

  return response.json();
}
