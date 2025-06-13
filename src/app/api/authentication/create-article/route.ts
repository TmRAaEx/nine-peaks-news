import { CreateArticle } from "@/lib/Articles";

export async function POST(request: Request) {
  const body = await request.json();
  const {
    title,
    description,
    header_img,
    content,
    sub_titles,
    sub_images,
    sub_content,
    required_tier,
    authur,
  } = body;

  const response = await CreateArticle({
    title,
    description,
    header_img,
    content,
    sub_titles,
    sub_images,
    sub_content,
    required_tier,
    authur,
    date: new Date(),
  });

  if (response.error) {
    console.error("[Authentication API]", response.error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify({ data: response }), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
