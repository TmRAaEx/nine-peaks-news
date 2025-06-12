import { ShowAllArticles } from "@/lib/Articles";
import '../../../styles/admin.css';

export default async function Articles() {

  const { articles, error } = await ShowAllArticles();

  return (
    <section className="dashboard articles">
      <div className="list-container articles">
        
        <div className="header-row">
          <div>Title</div>
          <div className="author">Author</div>
          <div className="date">Publish date</div>
          <div className="tier">Tier</div>
        </div>
        {error && <p className="text-red-500 text-center my-4">{error}</p>}
        {articles 
          ? articles.map((article, index) => (
              <div key={index} className="article-container">
                  <a href={`/admin/articles/${article._id}`} className="article-link">
                    <h3>{article.title.length > 20
                        ? `${article.title.slice(0, 35)}...`
                        : article.title}
                    </h3>
                    <div className="article-tags">
                      <p className="author">{article.authur}</p>
                      <p className="date">{article.date.toISOString().slice(0, 10)}</p>
                      <p className="tier">{article.required_tier}</p>
                    </div>
                  </a>
              </div>
            ))
          : <p>Could not load articles</p>
        }
        
      </div>
      <div className="dashboard-actions articles">

      </div>
    </section>
  );
}