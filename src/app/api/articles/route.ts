import { NextResponse } from "next/server";
import Article from "@/models/Article";

export async function GET() {
  try {
    const articles = await Article.find()

    const serialized = articles.map((article) => ({
      ...article,
      _id: article.id.toString(),
      date: article.date instanceof Date ? article.date.toISOString() : article.date,
    }));

    return NextResponse.json({ articles: serialized });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json({ error: "Failed to load articles" }, { status: 500 });
  }
}
