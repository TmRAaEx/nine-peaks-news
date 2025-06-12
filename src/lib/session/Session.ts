import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import Session, { ISession } from "@/models/Session";
import connectDB from "../ConnectDB";
import { getSessionFromCookies, setSessionCookie } from "./Cookie";
import { cookies } from "next/headers";
import Payment from "@/models/Payment";
import { IUser } from "@/models/User";

export async function createSession(userId: string) {
  await connectDB();

  const sessionToken = uuidv4();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24); // 1 dag

  await Session.create({
    user_id: userId,
    sessionToken,
    expiresAt,
  });

  await setSessionCookie(sessionToken);

  return { sessionToken };
}

export async function verifySession() {
  await connectDB();

  const sessionToken = await getSessionFromCookies();
  if (!sessionToken) return null;

  const session = await Session.findOne({
    sessionToken,
    expiresAt: { $gt: new Date() },
  });

  if (!session) {
    await destroySession();
  }

  return session || null;
}

export async function destroySession() {
  await connectDB();

  const cookieStore = cookies();
  const sessionToken = (await cookieStore).get("session_token")?.value;
  if (!sessionToken) return NextResponse.json({ message: "No session" });

  await Session.deleteOne({ sessionToken });

  const res = NextResponse.json({ message: "Logged out" });
  (await cookieStore).delete("session_token");

  return res;
}

export async function getSessionData(): Promise<{
  session: ISession;
  tier: string;
} | void> {
  const session = await verifySession();

  if (!session) {
    return;
  }

  const user_id = session.user_id;

  const payment = await Payment.findOne({ user_id: user_id }).sort({
    createdAt: -1,
  });

  const tier = payment?.tier_id || "Basecamp";

  return { session, tier };
}

export async function getUserSessions(userId: IUser["id"]) {
  await connectDB();

  const sessions = await Session.find({
    user_id: userId,
    expiresAt: { $gt: new Date() },
  });

  return sessions;
}
