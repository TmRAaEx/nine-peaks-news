"use client";

import IShowManyArticles from "@/interfaces/IShowManyArticles";
import apiClient from "@/lib/ApiClient";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Articles() {
  const [articles, setArticles] = useState<IShowManyArticles[]>([]);

  useEffect(() => {
    async function getArticles() {
      const { data } = await apiClient.get<{ data: IShowManyArticles[] }>(
        "/articles"
      );
      setArticles(data || []);
    }
    getArticles();
  }, []);



  return (
    <>
      {articles.map((article, idx) => (
        <Link href={`/articles/${article._id}`}>
          <div
            key={idx}
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
