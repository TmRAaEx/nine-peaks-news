import Stripe from "stripe";
import Payment from "@/models/Payment";

export default async function handleInvoicePaid(data: any, stripe: Stripe) {
  const invoice = data.object as Stripe.Invoice;
  const invoice_id = invoice.id;

  const { user_id, tier_id } = invoice.metadata || {};

  console.log(`Handling paid invoice ${invoice_id}`);
  console.log(`Metadata - user_id: ${user_id}, tier_id: ${tier_id}`);

  if (!user_id || !tier_id) {
    console.warn("Missing metadata for invoice. Skipping payment creation.");
    return;
  }

  const paymentDate = new Date(invoice.status_transitions?.paid_at! * 1000);
  const dueDate = new Date();
  dueDate.setDate(paymentDate.getDate() + 7);

  const payment = await Payment.create({
    user_id,
    tier_id,
    payment_date: paymentDate,
    due_date: dueDate,
    status: "paid",
    stripe_ref: invoice_id,
  });

  console.log("New payment created:", payment._id);
}
