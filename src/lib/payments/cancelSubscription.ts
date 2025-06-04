import getSubscriptionsByEmail from "./getSubscriptionByEmail";
import { stripe } from "./Stripe";
export default async function cancelSubscription(customer_email: string) {
  const subscription_id = await getSubscriptionsByEmail(customer_email);
  try {
    // Cancel the subscription
    const canceledSubscription = await stripe.subscriptions.cancel(
      subscription_id!
    );

    return canceledSubscription;
  } catch (error) {
    console.error("Error canceling subscription:", error);
    return null;
  }
}
