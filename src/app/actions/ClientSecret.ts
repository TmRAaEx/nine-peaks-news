"use server";

import { headers } from "next/headers";
import { stripe } from "@/lib/payments/Stripe";
import User, { IUser } from "@/models/User";

export async function fetchClientSecret(
  price_id: string,
  user_id: IUser["id"],
  tier_id: string
) {
  const origin = (await headers()).get("origin");
  const user = await User.findById(user_id)

  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      customer: user?.stripe_id,
      line_items: [
        {
          price: price_id,
          quantity: 1,
        },
      ],
      mode: "subscription",
      return_url: `${origin}/myaccount`,
      metadata: {
        user_id: user_id,
        tier_id: tier_id,
      },
    });

    return session.client_secret;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
