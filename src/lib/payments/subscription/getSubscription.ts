import User from "@/models/User";
import { stripe } from "../Stripe";

export async function getSubscription(userId: string) {
  const user = await User.findById(userId);
  if (!user || !user.stripe_id) {
    return { error: "User not found or missing Stripe ID" };
  }

  const subscriptions = await stripe.subscriptions.list({
    customer: user.stripe_id,
    status: "all",
    limit: 1,
  });

  const subscription = subscriptions.data[0];
  if (!subscription) {
    return { error: "No subscription found" };
  }

  const subscriptionStatus = subscription.status;

  const upcomingInvoice = await stripe.invoices.createPreview({
    subscription: subscription.id,
    customer: user.stripe_id,
  });

  const nextPaymentUnix = upcomingInvoice.next_payment_attempt! * 1000;
  const nextPaymentDate = new Date(nextPaymentUnix);
  const nextPayment = nextPaymentDate.toLocaleDateString();

  const lastInvoice = await stripe.invoices.retrieve(
    subscription.latest_invoice as string
  );
  const lastPaymentDate = lastInvoice.status_transitions.paid_at
    ? new Date(
        lastInvoice.status_transitions.paid_at * 1000
      ).toLocaleDateString()
    : null;

  const nextPaymentPrice = upcomingInvoice.amount_due / 100;

  const allInvoicesList = await stripe.invoices.list({
    customer: user.stripe_id,
    limit: 100,
  });

  const allInvoices = allInvoicesList.data.map((inv) => ({
    id: inv.id,
    status: inv.status,
    amount_due: inv.amount_due / 100,
    paid_at: inv.status_transitions.paid_at
      ? new Date(inv.status_transitions.paid_at * 1000).toLocaleDateString()
      : null,
    due_date: inv.period_end
      ? new Date(inv.period_end * 1000).toLocaleDateString()
      : null,
    hosted_invoice_url: inv.hosted_invoice_url,
  }));


    

  const unpaidInvoices = await stripe.invoices.list({
    subscription: subscription.id,
    status: "open",
  });

  const unpaidInvoice = unpaidInvoices.data[0];
  const sub_id = subscription.id
  
  return {
    sub_id,
    subscriptionStatus,
    nextPaymentPrice,
    lastPaymentDate,
    nextPayment,
    allInvoices,
    unpaidInvoice,
  };
}
