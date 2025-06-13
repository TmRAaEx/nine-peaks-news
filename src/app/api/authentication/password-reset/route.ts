import { NextResponse } from "next/server";
import { resetPassword } from "@/lib/Authentication";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, token, newPassword } = body;

    if (!userId || !token || !newPassword) {
      return new Response(JSON.stringify({ error: "Missing parameters" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const success = await resetPassword(userId, token, newPassword);

    if (!success) {
      return new Response(JSON.stringify({ error: "Password reset failed" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    return NextResponse.json(
      { message: "Password has been reset successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("[API] Reset Password Error:", err);

    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : "Internal server error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
