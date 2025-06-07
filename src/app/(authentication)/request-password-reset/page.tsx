
import { requestPasswordReset } from '@/lib/Actions';
import { revalidatePath } from 'next/cache';

export default function RequestPasswordResetPage() {
  return (
    <main className="max-w-md mx-auto py-10">
      <h2 className="text-xl font-semibold mb-4">Request Password Reset</h2>

      <form action={requestPasswordReset} className="space-y-4">
        <input
          type="email"
          name="email"
          required
          placeholder="Enter your email"
          className="w-full border px-3 py-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Send Reset Link
        </button>
      </form>
    </main>
  );
}