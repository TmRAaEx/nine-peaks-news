import { ShowAllArticles } from "@/lib/Articles";
import Link from "next/link";

export default async function Articles() {
  const { articles, error } = await ShowAllArticles();

  return (
    <>
      {error ?? <p>{error}</p>}
      {articles.map((article, idx) => (
        <Link href={`/articles/${article._id}`} key={article.id}>
          <div
            style={{
              border: "1px solid #ccc",
              margin: "1em 0",
              padding: "1em",
              cursor: "pointer",
            }}
          >
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <img
              src={article.header_img}
              alt={article.title}
              style={{ maxWidth: "200px" }}
            />
            <p>
              <strong>Author:</strong> {article.authur}
            </p>
          </div>
        </Link>
      ))}
    </>
  );
}
