import { ShowOneArticle } from "@/lib/Articles";

export default async function SingleArticle({
  params,
}: {
  params: Record<string, string>;
}) {
  const { id } = params;

  const { article, error } = await ShowOneArticle(id);

  if (!article) {
    return <>{error}</>;
  }

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.description}</p>
      <img
        src={article.header_img}
        alt={article.title}
        style={{ maxWidth: "200px" }}
      />
      <div>
        <p>{article.content}</p>
      </div>
      <div>
        <ul>
          {article.images &&
            article.images.map((img: string, i: number) => (
              <li key={i}>
                <img src={img} alt={`img-${i}`} style={{ maxWidth: "100px" }} />
              </li>
            ))}
        </ul>
      </div>
      <div>
        <ul>
          {article.sub_titles &&
            article.sub_titles.map((title: string, i: number) => (
              <li key={i}>
                <strong>{title}</strong>
                <div>{article.sub_content && article.sub_content[i]}</div>
              </li>
            ))}
        </ul>
      </div>
      <p>
        <strong>Author:</strong> {article.authur}
      </p>
      <p>
        <strong>Date:</strong>{" "}
        {article.date ? new Date(article.date).toLocaleString() : ""}
      </p>
    </div>
  );
}
