import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

const BACKEND_API_URL = process.env.BACKEND_API_URL;

async function syncGitHubUser(data: { name: string; email: string }) {
  const { name, email } = data;

  const response: Response = await fetch(
    `${BACKEND_API_URL}/users/email/${email}`,
  );

  console.log("response:", response);
  const user = await response.json().catch(() => null);
  console.log("user:", user);

  //Usuário já cadastrado no backend, não precisa criar
  const userExists =
    response.ok && (Array.isArray(user) ? user.length > 0 : Boolean(user));
  if (userExists) {
    return;
  }

  //Usuário não existe -> cria via registro OAuth
  console.log("Criando usuário:", email);
  const createResponse = await fetch(`${BACKEND_API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, oauth: true }),
  });

  if (!createResponse.ok) {
    console.error("createResponse:", createResponse);
    throw new Error("Erro ao criar usuário no backend");
  }
  console.log("Usuário criado com sucesso:", email);
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials: any) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;

        if (!email || !password) return null;

        try {
          const response = await fetch(`${BACKEND_API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) return null;

          const data = await response.json();
          return {
            id: email,
            name: data?.user ?? email,
            email,
          };
        } catch (error) {
          console.error("Erro ao autenticar no backend:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  trustHost: true,
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "github" && profile?.email) {
        try {
          console.log("Profile recebido do GitHub:", account, profile);
          await syncGitHubUser({
            name: (profile.name as string) ?? user.name ?? "",
            email: profile.email as string,
          });
        } catch (error) {
          console.error("Erro ao sincronizar usuário do GitHub:", error);
          return false;
        }
      }
      return true;
    },
  },
});
