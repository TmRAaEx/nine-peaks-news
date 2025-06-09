export default function ArticleCardLoading() {
  return (
    <li className="h-98 animate-pulse min-w-80">
      <div className="flex flex-col h-full bg-brown3 rounded-2xl shadow-md overflow-hidden">
        <div className="w-full h-48 bg-gray-200" />
        <div className="flex flex-col flex-grow p-4 space-y-3">
          <div className="h-6 w-2/3 bg-gray-200 rounded" />
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-5/6 bg-gray-200 rounded" />
          <div className="h-4 w-3/4 bg-gray-200 rounded" />
          <div className="h-4 w-1/3 bg-gray-200 rounded mt-auto" />
        </div>
      </div>
    </li>
  );
}
