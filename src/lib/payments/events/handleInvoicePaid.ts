import Stripe from "stripe";
import updatePayment from "../handlers/UpdatePayment";
import UpdatablePaymentData from "@/interfaces/UpdatabelPaymentData";

export default async function handleInvoicePaid(data: any, stripe: Stripe) {
  const invoice = data.object as Stripe.Invoice;
  const invoice_id = invoice.id;

  // Extract metadata
  const { db_payment_id, user_id, tier_id } = invoice.metadata || {};

  console.log(`Handling paid invoice ${invoice_id}`);
  console.log(
    `Metadata - db_payment_id: ${db_payment_id}, user_id: ${user_id}, tier_id: ${tier_id}`
  );

  const now = new Date();
  const oneWeekFromNow = new Date();
  oneWeekFromNow.setDate(now.getDate() + 7);

  const payment_data: UpdatablePaymentData = {
    payment_date: new Date(invoice.status_transitions?.paid_at! * 1000),
    due_date: oneWeekFromNow,
    stripe_ref: invoice_id,
    payments: [
      {
        payment_date: new Date(invoice.status_transitions?.paid_at! * 1000),
        due_date: oneWeekFromNow,
      },
    ],
    status: "paid",
  };

  console.log("Payment data:", payment_data);

  await updatePayment(db_payment_id, payment_data);

}
