import { verifySession } from "@/lib/Session";
import Payment from "@/models/Payment";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await verifySession();

  if (!session) {
    return NextResponse.json(false);
  }

  const user_id = session.user_id;

  const payment = await Payment.findOne({ user_id: user_id });

  const tier = payment?.tier_id;

  return NextResponse.json({ session, tier });
}
