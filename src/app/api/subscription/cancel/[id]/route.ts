//cancel subscription

import Params from "@/interfaces/api/Params";
import cancelSubscription from "@/lib/payments/subscription/cancelSubscription";
import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: Params) {
  try {
    const { id } = await params;

    const deleted = await cancelSubscription(id);

    return NextResponse.json({ invoice: deleted, status: 400 });
  } catch (err) {
    return NextResponse.json({ status: 500, message: "Internal server error" });
  }
}
