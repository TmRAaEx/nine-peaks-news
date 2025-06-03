import { ShowAllArticles } from "@/lib/Authentication";

export async function GET() {
  const response = await ShowAllArticles({});

  if (!Array.isArray(response) && response.error) {
    console.error("[Authentication API]", response.error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ data: response }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}   