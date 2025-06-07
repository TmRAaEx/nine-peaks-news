import Article, { IArticle } from "@/models/Article";
import connectDB from "./ConnectDB";
import ICreateArticleData from "@/interfaces/ICreateArticle";

export async function CreateArticle(
  data: ICreateArticleData
): Promise<IArticle | any> {
  try {
    await connectDB();

    const createdArticle = await Article.create(data);
    return createdArticle;
  } catch (err) {
    console.error("[LIB Authentication Create-Article]", err);
    return { error: err };
  }
}

export async function ShowAllArticles(
  data: any = {}
): Promise<{ articles: IArticle[]; error: string | null }> {
  try {
    await connectDB();
    const articles = await Article.find(data);
    return { articles: articles, error: null };
  } catch (err) {
    console.error("[LIB Authentication Articles]", err);
    const message = err instanceof Error ? err.message : "Unexpected error";
    return { articles: [], error: message };
  }
}

export async function ShowOneArticle(id: string) {
  try {
    await connectDB();
    return await Article.findById(id);
  } catch (err) {
    console.error("[LIB Authentication Articles]", err);
    return { error: err };
  }
}
