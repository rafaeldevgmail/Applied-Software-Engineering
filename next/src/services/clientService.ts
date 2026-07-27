import { log } from "console";
import { Client } from "@/types/client";

// Detecta se o código está rodando no navegador ou no servidor do Next.js
const API_URL =
  typeof window !== "undefined"
    ? process.env.NEXT_PUBLIC_BACKEND_API_URL
    : process.env.BACKEND_API_URL;

export async function getClients() {
  try {
    const response = await fetch(`${API_URL}/clients`, {
      cache: "no-store", // Ou 'force-cache' dependendo da estratégia
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error("Erro ao buscar clientes:", error);
    throw error; // Repassa o erro para a View tratar se necessário
  }
}

export async function getClientById(id: string) {
  const response = await fetch(`${API_URL}/clients/${id}`);
  return response.json();
}

export async function createClient(data: Omit<Client, "id">) {
  console.log(JSON.stringify(data));
  const response = await fetch(`${API_URL}/clients`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Erro ao criar cliente: ${response.status}`);
  }

  return response.json();
}

export async function updateClient(id: number, data: Omit<Client, "id">) {
  console.log(JSON.stringify(data));
  const response = await fetch(`${API_URL}/clients/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Erro ao atualizar cliente: ${response.status}`);
  }

  return response.json();
}

export async function deleteClient(id: number) {
  const response = await fetch(`${API_URL}/clients/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Erro ao deletar cliente: ${response.status}`);
  }

  return response.json();
}
