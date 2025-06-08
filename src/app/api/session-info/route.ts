import { getSessionData } from "@/lib/session/Session";
import { NextResponse } from "next/server";

export async function GET() {
  const sessionData = await getSessionData(); //false || {session, tier}

  return NextResponse.json({ sessionData });
}
