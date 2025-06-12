"use server";

import { stripe } from "@/lib/payments/Stripe";
import Tier from "@/models/Tier"; // Assuming this is a Mongoose model

export async function createTier(formData: FormData) {
  const name = formData.get("name") as string;
  const priceStr = formData.get("price") as string;
  const benefits = formData.getAll("benefits") as string[];

  const price = parseFloat(priceStr);

  if (!name || isNaN(price)) return;

  try {
    // Step 1: Create product on Stripe
    const product = await stripe.products.create({
      name,
      description: `Weekly subscription for ${name}`,
      metadata: { type: "tier" },
    });

    console.log("Stripe product created:", product.id);

    // Step 2: Create price on Stripe
    const stripePrice = await stripe.prices.create({
      unit_amount: Math.round(price * 100), // Convert dollars to cents
      currency: "usd",
      recurring: { interval: "week" },
      product: product.id,
    });

    console.log("Stripe price created:", stripePrice.id);

    // Step 3: Save tier in database
    const newTier = await Tier.create({
      _id: name,
      price,
      stripe_id: stripePrice.id,
      benefits: benefits.filter(Boolean), // remove empty strings
    });

    console.log("Tier saved to database:", newTier);
  } catch (error) {
    console.error("Error creating tier:", error);
    throw error;
  }
}