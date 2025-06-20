import Stripe from "stripe";
import Payment from "@/models/Payment";

export default async function handleInvoiceFailed(data: any) {
  const invoice = data.object as Stripe.Invoice;
  const invoice_id = invoice.id;

  const { metadata } = (invoice as any).subscription_details;
  const { user_id, tier_id } = metadata;

  console.log(`Handling failed invoice ${invoice_id}`);
  console.log(`Metadata - user_id: ${user_id}, tier_id: ${tier_id}`);

  if (!user_id || !tier_id) {
    console.warn(
      "Missing metadata in subscription_details. Skipping failed payment creation."
    );
    return;
  }

  const existingPayment = await Payment.findOne({ stripe_ref: invoice_id });

  if (existingPayment) {
    console.log(`Payment with stripe_ref ${invoice_id} already exists.`);

    if (existingPayment.status !== "failed") {
      existingPayment.status = "failed";
      existingPayment.payment_date = null;
      await existingPayment.save();
      console.log(
        `Updated existing payment status to failed for ${invoice_id}`
      );
    } else {
      console.log("Payment status is already failed, no update needed.");
    }
    return;
  }

  const nextAttemptDate = getNextAttemptDate(invoice);

  const failedPayment = await Payment.create({
    user_id,
    tier_id: "Basecamp", //reset the tier
    payment_date: null,
    due_date: nextAttemptDate,
    status: "failed",
    stripe_ref: invoice_id,
  });

  console.log("Failed payment recorded:", failedPayment._id);
}

function getNextAttemptDate(invoice: Stripe.Invoice): Date {
  if (invoice.next_payment_attempt) {
    return new Date(invoice.next_payment_attempt * 1000);
  }

  const now = new Date();
  const retryDays = [0, 1, 3, 5, 7, 14]; //stripe default scheduel
  const attemptCount = invoice.attempt_count || 0;

  if (attemptCount < retryDays.length) {
    const nextRetryDay = retryDays[attemptCount];
    const nextAttemptDate = new Date(now);
    nextAttemptDate.setDate(now.getDate() + nextRetryDay);
    return nextAttemptDate;
  }

  const defaultNextAttempt = new Date(now);
  defaultNextAttempt.setDate(now.getDate() + 14);
  return defaultNextAttempt;
}
