import Stripe from "stripe";
import Payment from "@/models/Payment";
export default async function handleInvoicePaid(data: any, stripe: Stripe) {
  const invoice = data.object as Stripe.Invoice;
  const invoice_id = invoice.id;

  const { subscription_details, subscription } = invoice as any;

  const { user_id, tier_id } = subscription_details.metadata;

  const paymentDate = new Date(invoice.status_transitions?.paid_at! * 1000);
  const dueDate = new Date(paymentDate);
  dueDate.setDate(paymentDate.getDate() + 7);

  const payment = await Payment.create({
    user_id: user_id,
    tier_id: tier_id,
    payment_date: paymentDate,
    due_date: dueDate,
    status: "paid",
    stripe_ref: invoice_id,
  });

  console.log("New payment created:", payment._id);

  console.log(subscription);

  // Check if the subscription is past_due and update if necessary
  if (subscription) {
    const subscriptionDetails = await stripe.subscriptions.retrieve(
      subscription
    );

    if (subscriptionDetails.status === "past_due") {
      try {
        const updatedSubscription = await stripe.subscriptions.update(
          subscription,
          {
            billing_cycle_anchor: "now",
            proration_behavior: "none",
            collection_method: "charge_automatically",
            cancel_at_period_end: false,
          }
        );

        console.log("Subscription updated to active:", updatedSubscription.id);
      } catch (error) {
        console.error("Error updating subscription:", error);
      }
    }
  }
}
