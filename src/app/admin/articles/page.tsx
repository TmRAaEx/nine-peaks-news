import { ShowAllArticles } from "@/lib/Articles";

export default async function Articles() {

  const { articles, error } = await ShowAllArticles();

  return (
    <section className="dashboard articles">
      <div className="list-container articles">
        <div className="header-row">
          <div>Title</div>
          <div>Publish date</div>
          <div>Author</div>
          <div>Tier</div>
          <div>Actions</div>
        </div>
        {error && <p className="text-red-500 text-center my-4">{error}</p>}
        {articles && Array.isArray(articles)
          ? articles.map((article, index) => (
              <div key={index} className="article-container">
                <a href={`/admin/articles/${article._id}`}><h3>{article.title}</h3></a>
                <p>{article.description}</p>
                <div className="article-tags">
                  <span>Published: {article.date.toDateString()}</span>
                  <span>Author: {article.authur}</span>
                  <span>Tier: {article.required_tier}</span>
                </div>
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