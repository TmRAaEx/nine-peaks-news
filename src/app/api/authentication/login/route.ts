import { SignUserIn } from "@/lib/Authentication";
import { NextResponse } from "next/server";
import { createSession } from "@/lib/Session";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  const response = await SignUserIn({ email, password });

  if ("error" in response) {
    let status = 400;
    if (response.error === "User not found") status = 404;
    else if (response.error === "Invalid password") status = 401;

    return new Response(JSON.stringify({ error: response.error }), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  }
  await createSession(response.user._id.toString());

  const res = NextResponse.json(
    { data: response },
    {
      status: 200,
    }
  );

  return res;
}
