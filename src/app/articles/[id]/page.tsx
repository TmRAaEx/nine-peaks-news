"use client";
import IShowOneArticle from "@/interfaces/IShowOneArticle";
import apiClient from "@/lib/ApiClient";
import { useEffect, useState, use } from "react";

export default function SingleArticle({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [article, setArticle] = useState<IShowOneArticle | null>(null);

  useEffect(() => {
    async function getArticle() {
      const { data } = await apiClient.get<{ data: IShowOneArticle }>(
        "/articles/" + id
      );
      setArticle(data);
    }
    getArticle();
  }, [id]);

  if (!article) return <div>Loading...</div>;

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
