"use client";
import Link from "next/link";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NoAccessModal({
  tier,
  noaccess,
}: {
  tier: string;
  noaccess: string | undefined;
}) {
  const router = useRouter();

  console.log(tier, noaccess);

  if (!noaccess) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
      <div className="relative bg-white rounded-xl p-6 max-w-md w-full shadow-lg text-center space-y-4">
        <button
          onClick={() => router.push("/articles")}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          <X className="w-5 h-5 cursor-pointer" />
        </button>

        <h2 className="text-xl font-bold text-red-600">Access Denied</h2>
        <p className="text-gray-700">
          You need at least <strong>{tier}</strong> to access this content!
        </p>
        <Link
          className="text-blue2 underline hover:text-blue-600"
          href={`/upgrade?tier=${tier}`}
        >
          Upgrade your account
        </Link>
      </div>
    </div>
  );
}
