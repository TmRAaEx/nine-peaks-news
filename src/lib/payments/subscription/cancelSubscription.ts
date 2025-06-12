import { stripe } from "../Stripe";

export default async function cancelSubscription(subscriptionId: string) {
  const updated = await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  });

  return updated;
}
