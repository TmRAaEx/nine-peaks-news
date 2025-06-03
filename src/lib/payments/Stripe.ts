import "server-only";

import Stripe from "stripe";

const secret_key = process.env.STRIPE_SK;

if (!secret_key) {
  throw new Error("[Stripe]: STRIPE_SK is not set in environment");
}

export const stripe = new Stripe(secret_key);
