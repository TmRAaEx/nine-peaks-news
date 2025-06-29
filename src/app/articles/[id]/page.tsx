import { ShowOneArticle } from "@/lib/Articles";
import Breadcrumbs from "./Breadcrumbs";
import getUserData from "@/lib/UserData";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function SingleArticle({
  params,
}: {
  params: Promise<Record<string, string>>;
}) {
  const { id } = await params;
  const { article, error } = await ShowOneArticle(id);
  const userData = await getUserData();

  console.log(userData);

  if (!article) {
    return <p className="text-red-600 text-center my-6">{error}</p>;
  }

  const tierLevels: Record<string, number> = {
    Basecamp: 1,
    "Summit Seeker": 2,
    "Peak Elite": 3,
    Admin: 4,
  };

  const userTier = userData ? userData.tier : "Basecamp";

  if (tierLevels[userTier] < tierLevels[article.required_tier]) {
    redirect(`/articles?noaccess=true&tier=${article.required_tier}`);
  }

  return (
    <article className="max-w-4xl mx-auto p-6 space-y-8 bg-brown3">
      <Breadcrumbs title={article.title} />

      <header className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">{article.title}</h1>
        <p className="text-lg text-gray-700">{article.description}</p>
        <Image
          src={article.header_img}
          alt={article.title}
          className="w-full max-h-[400px] object-cover rounded-xl shadow"
          width={700}
          height={300}
        />
      </header>
      <section className="prose max-w-none">
        <p>{article.content}</p>
      </section>
      {article.sub_titles && article.sub_titles.length > 0 && (
        <section className="space-y-6">
          <ul className="space-y-8">
            {article.sub_titles.map((title: string, i: number) => (
              <li key={i} className="bg-white p-4 rounded shadow">
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                {article.sub_content && (
                  <p className="text-gray-700 mb-2">{article.sub_content[i]}</p>
                )}
                {article.sub_images &&
                  article.sub_images[i] &&
                  article.sub_images[i] !== "" && (
                    <Image
                      src={article.sub_images[i]}
                      alt={`Sub Image ${i}`}
                      className="w-full max-h-[300px] object-cover rounded"
                      width={700}
                      height={300}
                    />
                  )}
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
