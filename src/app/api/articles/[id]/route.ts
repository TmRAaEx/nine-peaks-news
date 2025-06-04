import { ShowOneArticle } from "@/lib/Authentication";
import Params from "@/types/Params";

export async function GET(request: Request, { params }: Params) {
  const { id } = await params;
  const response = await ShowOneArticle(id);

  if (!response || (response as any).error) {
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
