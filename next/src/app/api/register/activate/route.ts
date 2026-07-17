import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ message: "No token provided" }, { status: 400 });
  }
  try {
    const response = await fetch(
      `${process.env.BACKEND_API_URL}/auth/register-complete`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      },
    );
    console.log(response);
    if (!response.ok) {
      const errorData = await response.json();

      return NextResponse.json(
        { message: errorData.message || "Failed to activate account" },
        { status: response.status },
      );
    }
    const redirectUrl = new URL("/auth/login", request.url);
    redirectUrl.searchParams.set("activated", "true");
    //redirecionar e mostrar mensagem de sucesso
    return NextResponse.redirect(redirectUrl);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
