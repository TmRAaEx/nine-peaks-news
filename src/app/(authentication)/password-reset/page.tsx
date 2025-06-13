"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

function Wrapper() {
  //fixes a weird errror
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const userId = searchParams.get("id");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/authentication/password-reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, userId, newPassword }),
    });

    const data = await res.json();
    setMessage(res.ok ? " Password reset!" : ` ${data.error}`);
  };

  return (
    <main className="max-w-md mx-auto py-10">
      <h2 className="text-xl font-semibold mb-4">Reset Your Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Reset Password
        </button>
      </form>
      {message && <p className="mt-4 text-sm">{message}</p>}
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <Wrapper></Wrapper>
    </Suspense>
  );
}
