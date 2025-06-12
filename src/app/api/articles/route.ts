import { NextResponse } from "next/server";
import clientPromise from "@/lib/Mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("NinePeaks");
    const articles = await db.collection("articles").find({}).toArray();

    const serialized = articles.map((article) => ({
      ...article,
      _id: article._id.toString(),
      date: article.date instanceof Date ? article.date.toISOString() : article.date,
    }));

    return NextResponse.json({ articles: serialized });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json({ error: "Failed to load articles" }, { status: 500 });
  }
}
