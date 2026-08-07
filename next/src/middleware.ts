import { auth } from "@/auth";

export default auth((req: Request) => {
  //contém os dados do usuário se ele estiver logado, ou null se estiver deslogado
  // !! converte em valor booleano: true (se houver sessão) ou false (se não houver).
  const isLoggedIn = !!req.auth;
  const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard");

  if (isOnDashboard && !isLoggedIn) {
    return Response.redirect(new URL("/auth/login", req.nextUrl));
  }
});

export const config = {
  // Whitelist:
  //matcher: ["/dashboard/:path*", "/api/:path*"],
  // Blacklist: Roda o middleware em todas as páginas do site, EXCETO em arquivos estáticos (imagens, ícones) e rotas de API
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
