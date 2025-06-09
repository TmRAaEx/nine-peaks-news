import UpdatablePaymentData from "@/interfaces/UpdatabelPaymentData";
import Stripe from "stripe";
import updatePayment from "../handlers/UpdatePayment";

export default async function handleInvoiceFailed(data: any, stripe: Stripe) {
  const invoice = data.object as Stripe.Invoice;
  const invoice_id = invoice.id;

  // Extract metadata
  const { db_payment_id, user_id, tier_id } = invoice.metadata || {};

  console.log(`Handling failed invoice ${invoice_id}`);
  console.log(
    `Metadata - db_payment_id: ${db_payment_id}, user_id: ${user_id}, tier_id: ${tier_id}`
  );

  const now = new Date();
  const nextAttemptDate = getNextAttemptDate(invoice);

  const payment_data: UpdatablePaymentData = {
    payment_date: null, // No payment date for failed payment
    due_date: nextAttemptDate,
    stripe_ref: invoice_id,
    payments: [
      {
        payment_date: null,
        due_date: nextAttemptDate,
      },
    ],
    status: "failed",
  };

  console.log("Payment data:", payment_data);

  await updatePayment(db_payment_id, payment_data);
}

function getNextAttemptDate(invoice: Stripe.Invoice): Date {
  // If next_payment_attempt is available, use it
  if (invoice.next_payment_attempt) {
    return new Date(invoice.next_payment_attempt * 1000);
  }

  // If not, calculate based on the current date and Stripe's default retry schedule
  const now = new Date();
  const retryDays = [0, 1, 3, 5, 7, 14]; // Stripe's default retry schedule
  const attemptCount = invoice.attempt_count || 0;

  if (attemptCount < retryDays.length) {
    const nextRetryDay = retryDays[attemptCount];
    const nextAttemptDate = new Date(now);
    nextAttemptDate.setDate(now.getDate() + nextRetryDay);
    return nextAttemptDate;
  }

  // If we've exhausted all retry attempts, set a default (e.g., 14 days from now)
  const defaultNextAttempt = new Date(now);
  defaultNextAttempt.setDate(now.getDate() + 14);
  return defaultNextAttempt;
}
