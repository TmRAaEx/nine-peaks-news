import { IArticle } from "@/models/Article";
import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function ArticleCard({ article }: { article: IArticle }) {
  return (
    <li className="h-98">
      <Link href={`/articles/${article.id}`} className="block h-full">
        <div className="flex flex-col h-full bg-brown3 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
          <Image
            src={article.header_img}
            alt={article.title}
            className="w-full h-48 object-cover"
            width={300}
            height={100}
          />
          <div className="flex flex-col flex-grow p-4">
            <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
            <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
              {article.description}
            </p>
            <p className="text-sm text-gray-500 mt-auto">
              <strong>Author:</strong> {article.authur}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
}
