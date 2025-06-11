"use client";

import { IArticle } from "@/models/Article";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Articles() {

  const [articleList, setArticleList] = useState<IArticle[]>([]);

  useEffect(() => {
    const getData = async (data: any = {}) => {
      try {
        // TODO Connect to db and fetch
        // TODO setArticleList(articles);
      } catch (error) {
        console.log(error);
      }
    }
    getData();

  }, []);


  return (
    <section className="dashboard-section articles">
      <div className="list-container articles">
        <h3>Articles</h3>
        
      </div>
      <div className="dashboard-actions articles">

      </div>
    </section>
  );
}