"use client";

import IShowManyArticles from "@/interfaces/IShowManyArticles";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Articles(){
    const [articles, setArticles] = useState<IShowManyArticles[]>([]);
    const router = useRouter();
    
    
  useEffect(() => {
    async function fetchArticles() {
      const res = await fetch("/api/authentication/articles");
      const result = await res.json();
      setArticles(result.data || []);
    }
    fetchArticles();
  }, []);

      return (
        <div>
          <h1>Articles</h1>
          {articles.map((article, idx) => (
          <div 
          key={idx} 
          style={{ border: "1px solid #ccc", margin: "1em 0", padding: "1em", cursor: "pointer" }} 
          onClick={() => router.push(`/articles/${article._id}`)}>
            <h2>{article.title}</h2>
              <p>{article.description}</p>
              <img src={article.header_img} alt={article.title} style={{ maxWidth: "200px" }} />
              <p><strong>Author:</strong> {article.authur}</p>
            </div>
          ))}
        </div>
      );
    }