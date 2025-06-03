import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/payments/Stripe";
import connectDB from "@/lib/ConnectDB";
import Stripe from "stripe";
import Payment, { IPayment } from "@/models/Payment";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  const buf = await req.text();
  const sig = req.headers.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err) {
    console.error(
      `Webhook Error: ${err instanceof Error ? err.message : "Unknown Error"}`
    );
    return NextResponse.json(
      {
        error: `Webhook Error: ${
          err instanceof Error ? err.message : "Unknown Error"
        }`,
      },
      { status: 400 }
    );
  }

  // Connect to the database
  await connectDB();

  try {
    // Handle the event
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "invoice.paid":
      case "invoice.payment_failed":
        const eventObject = event.data.object as
          | Stripe.Subscription
          | Stripe.Invoice;
        await handleSubscriptionChange(eventObject, event.type);
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
async function handleSubscriptionChange(
  data: Stripe.Subscription | Stripe.Invoice,
  eventType: string
) {
  let subscriptionId: string;
  let status: IPayment["status"];
  let paymentDate: Date;
  let dueDate: Date;
  let userId: string;
  let tierId: string;

  if ("object" in data && data.object === "invoice") {
    // This is an invoice event
    const invoice = data as Stripe.Invoice;

    if (!invoice.subscription) {
      throw new Error("Invoice is not associated with a subscription");
    }

    // Retrieve the subscription from the invoice's subscription field
    const subscription = await stripe.subscriptions.retrieve(
      invoice.subscription as string
    );

    subscriptionId = subscription.id;
    status = eventType === "invoice.paid" ? "paid" : "failed";
    paymentDate = new Date(invoice.created * 1000);
    dueDate = new Date(invoice.period_end * 1000);
    userId = subscription.metadata.user_id;
    tierId = subscription.metadata.tier_id;
  } else if ("object" in data && data.object === "subscription") {
    // This is a subscription event
    const subscription = data as Stripe.Subscription;
    subscriptionId = subscription.id;

    // Fetch the latest invoice for this subscription
    const invoices = await stripe.invoices.list({
      subscription: subscriptionId,
      limit: 1,
    });
    const latestInvoice = invoices.data[0];

    if (!latestInvoice) {
      throw new Error("No invoice found for subscription");
    }

    status = subscription.status === "active" ? "paid" : "pending";
    paymentDate = new Date(latestInvoice.created * 1000);
    dueDate = new Date(latestInvoice.period_end * 1000);
    userId = subscription.metadata.user_id;
    tierId = subscription.metadata.tier_id;
  } else {
    throw new Error("Unexpected event data structure");
  }

  try {
    let payment = await Payment.findOne({ stripe_ref: subscriptionId });

    if (!payment) {
      // This is a new subscription
      payment = new Payment({
        user_id: userId,
        tier_id: tierId,
        payment_date: paymentDate,
        due_date: dueDate,
        status: status,
        stripe_ref: subscriptionId,
      });
    } else {
      // Update existing payment
      payment.payment_date = paymentDate;
      payment.due_date = dueDate;
      payment.status = status;
    }

    await payment.save();
  } catch (error) {
    console.error("Error updating payment:", error);
    throw error;
  }
}
