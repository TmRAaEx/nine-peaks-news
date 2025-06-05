// /lib/session.ts
import { cookies } from "next/headers";

export async function getSessionFromCookies() {
  const cookieStore = cookies();
  const sessionToken = (await cookieStore).get("session_token")?.value;
  return sessionToken;
}

export async function setSessionCookie(session_token: string) {
  const cookieStore = cookies();
  const sessionToken = (await cookieStore).set({
    name: "session_token",
    value: session_token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 1 dag
  });

  return sessionToken;
}
