import { ShowOneArticle } from "@/lib/Articles";

export default async function SingleArticle({
  params,
}: {
  params: Record<string, string>;
}) {
  const { id } = params;
  const { article, error } = await ShowOneArticle(id);

  if (!article) {
    return <p className="text-red-600 text-center my-6">{error}</p>;
  }

  return (
    <article className="max-w-4xl mx-auto p-6 space-y-8 bg-brown3">
      <header className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">{article.title}</h1>
        <p className="text-lg text-gray-700">{article.description}</p>
        <img
          src={article.header_img}
          alt={article.title}
          className="w-full max-h-[400px] object-cover rounded-xl shadow"
        />
      </header>

      <section className="prose max-w-none">
        <p>{article.content}</p>
      </section>

      {article.images && article.images.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-2">Bilder</h2>
          <ul className="flex flex-wrap gap-4">
            {article.images.map((img: string, i: number) => (
              <li key={i}>
                <img
                  src={img}
                  alt={`img-${i}`}
                  className="w-32 h-32 object-cover rounded-lg shadow"
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      {article.sub_titles && article.sub_titles.length > 0 && (
        <section className="space-y-6">
          <ul className="space-y-4">
            {article.sub_titles.map((title: string, i: number) => (
              <li key={i}>
                <h3 className="text-lg font-semibold">{title}</h3>
                <div className="text-gray-700">
                  {article.sub_content && article.sub_content[i]}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="border-t pt-4 text-sm text-gray-600 bg-brown3 flex gap-2">
        <p>
          <strong>Author:</strong> {article.authur}
        </p>
        <p>{article.date ? new Date(article.date).toDateString() : ""}</p>
      </section>
    </article>
  );
}
