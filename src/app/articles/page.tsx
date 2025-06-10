import { ShowAllArticles } from "@/lib/Articles";
import ArticleCard from "./ArticleCard";
import NoAccessModal from "./NoAccessModal";

export default async function Articles({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
  const { articles, error } = await ShowAllArticles();

  const { noaccess, tier } = searchParams;

  return (
    <>
      {error && <p className="text-red-500 text-center my-4">{error}</p>}

      <NoAccessModal tier={tier!} noaccess={noaccess}/>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-6xl mx-auto">
        {articles.map((article) => (
          <ArticleCard article={article} key={article.id} />
        ))}
      </ul>
    </>
  );
}
