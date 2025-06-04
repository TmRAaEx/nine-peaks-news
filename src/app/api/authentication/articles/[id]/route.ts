import { ShowOneArticle } from "@/lib/Authentication";

export async function GET() {
  const response = await ShowOneArticle();

  if (!response || (!Array.isArray(response) && (response as any).error)) {
    const errorMsg = !response
      ? "Article not found"
      : "[Authentication API] " + (response as any).error;
    console.error(errorMsg);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ data: response }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}