import ArticleCardLoading from "./LoadingCard";

export default function Loading() {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-6xl mx-auto">
      {Array.from({ length: 6 }).map((_, idx) => (
        <ArticleCardLoading key={idx} />
      ))}
    </ul>
  );
}
