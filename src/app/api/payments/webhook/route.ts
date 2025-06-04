
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { handleStripeWebhook } from "@/lib/payments/handleStripeWebhook";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature") ?? "";

  try {
    const result = await handleStripeWebhook(body, signature);
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Webhook failed";
    console.error(message);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
