import { ShowOneArticle } from "@/lib/Articles";
import '../../../../styles/admin.css';
import { authClient } from "@/lib/ApiClient";
import { FormEvent, ChangeEvent } from "react";

export default async function Article({ params, }: { params: Promise<Record<string, string>>; }) {

    const { id } = await params;
    const { article, error } = await ShowOneArticle(id);

    if(!article) return null;

    return (
      <>
        <section className="dashboard article">
          <article>
            
            <h3>{article.title}</h3>
            <div className="article-tags">
              <div className="tier-tag">
                <img src={`/img/icons/${article.required_tier.toLowerCase().replace(/ /g, '_')}.svg`} alt="icon" />
                <span >{article.required_tier}</span>
              </div>
              <span>Publish date: {article.date.toISOString().slice(0, 10)}</span>
              <span>Author: {article.authur}</span>
            </div>
            <p className="ingress">{article.description}</p>
            <img src={article.header_img} alt="article header image" />
            <h4>{article.sub_titles[0]}</h4>
            <p className="body">{article.content}</p>
            {article.sub_titles && article.sub_titles.length > 0 && (
              <section>
                <ul>
                  {article.sub_titles.map((title: string, i: number) => (
                    <li key={i} className="bg-white p-4 rounded shadow">
                      <h4 className="text-xl font-semibold mb-2">{title}</h4>
                      {article.sub_content && (
                        <p className="text-gray-700 mb-2">{article.sub_content[i]}</p>
                      )}
                      {article.sub_images &&
                        article.sub_images[i] &&
                        article.sub_images[i] !== "" && (
                          <img
                            src={article.sub_images[i]}
                            alt={`Sub Image ${i}`}
                            className="w-full max-h-[300px] object-cover rounded"
                          />
                        )}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </article>
          <div className="actions">

          </div>
        </section>
      </>
    );
}