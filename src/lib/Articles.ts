import Article, { IArticle } from "@/models/Article";
import connectDB from "./ConnectDB";
import ICreateArticleData from "@/interfaces/ICreateArticle";
import { FilterQuery } from "mongoose";

export async function CreateArticle(
  data: ICreateArticleData
): Promise<{ article: IArticle | null; error: string | null }> {
  try {
    await connectDB();

    const createdArticle = await Article.create(data);
    return { article: createdArticle, error: null };
  } catch (err) {
    console.error("[LIB Authentication Create-Article]", err);
    const message = err instanceof Error ? err.message : "Unexpected error";
    return { article: null, error: message };
  }
}

export async function ShowAllArticles(
  filter: FilterQuery<IArticle> = {}
): Promise<{ articles: IArticle[]; error: string | null }> {
  try {
    await connectDB();
    const articles = await Article.find(filter);
    return { articles, error: null };
  } catch (err) {
    console.error("[LIB Authentication Articles]", err);
    const message = err instanceof Error ? err.message : "Unexpected error";
    return { articles: [], error: message };
  }
}

export async function ShowOneArticle(
  id: string
): Promise<{ article: IArticle | null; error: string | null }> {
  try {
    await connectDB();
    const article = await Article.findById(id);

    if (!article) {
      return { article: null, error: "Article not found" };
    }

    return { article, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error";
    return { article: null, error: message };
  }
}
