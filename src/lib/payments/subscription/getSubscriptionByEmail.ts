import { stripe } from "@/lib/payments/Stripe";

export default async function getSubscriptionsByEmail(email: string) {
  try {
    // Find the customer
    const customers = await stripe.customers.list({ email: email, limit: 1 });

    if (customers.data.length === 0) {
      console.log("No customer found with this email");
      return;
    }

    const customerId = customers.data[0].id;

    // Get the subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
    });

    console.log("Subscriptions:", subscriptions.data);
    return subscriptions.data[0].id;
  } catch (error) {
    console.error("Error:", error);
  }
}
