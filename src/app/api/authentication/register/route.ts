import { RegisterUser } from "@/lib/Authentication";

export async function POST(request: Request) {
  const body = await request.json();
  const { userName, email, password, confirm_password } = body;

  if (password !== confirm_password) {
    
    return new Response(JSON.stringify({ error: "Missmatched password" }), {
      status: 400,
    });
  }

  const response = await RegisterUser({ userName, email, password });

  if (response.error) {
    console.error("[Authentication API]", response.error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({data: response}), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
