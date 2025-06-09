import { IArticle } from "@/models/Article";
import Link from "next/link";
import React from "react";

export default function Breadcrumbs({ title }: { title: IArticle["title"] }) {
  return (
    <nav className="text-md text-blue3 mb-6 font-semibold" aria-label="Breadcrumb">
      <ol className="list-none p-0 inline-flex space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link href="/" className="inline-flex items-center hover:underline">
            Home
          </Link>
        </li>
        <li className="inline-flex items-center">
          <span className="mx-1 ">/</span>
          <Link
            href="/articles"
            className="inline-flex items-center hover:underline"
          >
            Articles
          </Link>
        </li>
        <li className="inline-flex items-center text-gray-600">
          <span className="mx-1 text-blue2">/</span>
          <span>{title}</span>
        </li>
      </ol>
    </nav>
  );
}
