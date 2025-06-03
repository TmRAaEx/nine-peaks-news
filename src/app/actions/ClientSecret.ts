"use server";

import { headers } from "next/headers";
import { stripe } from "@/lib/payments/Stripe";

export async function fetchClientSecret(price_id: string) {
  const origin = (await headers()).get("origin");

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          price: price_id,
          quantity: 1,
        },
      ],
      mode: "subscription",
      return_url: `${origin}/return?session_id={CHECKOUT_SESSION_ID}`,
    });

    return session.client_secret;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
