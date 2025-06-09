export default function Loading() {
  return (
    <article className="max-w-4xl mx-auto p-6 space-y-8 animate-pulse bg-brown3">
      {/* Header */}
      <header className="space-y-4">
        <div className="h-8 w-2/3 bg-gray-200 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-[300px] w-full bg-gray-200 rounded-xl" />
      </header>

      {/* Content */}
      <section className="space-y-2">
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-5/6 bg-gray-200 rounded" />
        <div className="h-4 w-4/6 bg-gray-200 rounded" />
      </section>

      {/* Images */}
      <section>
        <div className="h-6 w-32 bg-gray-300 rounded mb-3" />
        <ul className="flex flex-wrap gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <li key={i}>
              <div className="w-32 h-32 bg-gray-200 rounded-lg" />
            </li>
          ))}
        </ul>
      </section>

      {/* Subsections */}
      <section className="space-y-4">
        <div className="h-5 w-24 bg-gray-300 rounded" />
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-1/3 bg-gray-200 rounded" />
            <div className="h-4 w-2/3 bg-gray-200 rounded" />
            <div className="h-4 w-1/2 bg-gray-200 rounded" />
          </div>
        ))}
      </section>

      {/* Footer */}
      <section className="border-t pt-4 text-sm text-gray-600 flex gap-2">
        <div className="h-4 w-24 bg-gray-200 rounded" />
        <div className="h-4 w-32 bg-gray-200 rounded" />
      </section>
    </article>
  );
}
