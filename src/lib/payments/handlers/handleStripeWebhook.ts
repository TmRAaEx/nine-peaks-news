import Stripe from "stripe";
import { stripe } from "../Stripe";
import handleCheckoutCompleted from "../events/handleCheckoutCompleted";
import handleInvoicePaid from "../events/handleInvoicePaid";
import handleInvoiceFailed from "../events/handlePaymentFailed";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function handleStripeWebhook(body: string, signature: string) {
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid signature";
    throw new Error(`[stripe webhook]: ${message}`);
  }

  const data = event.data;

  const eventType = event.type;

  const handledEvents: (typeof eventType)[] = [
    "checkout.session.completed",
    "invoice.paid",
    "invoice.payment_failed",
    "customer.subscription.deleted",
  ];

  const isHandled = handledEvents.includes(eventType);
  if (!isHandled) {
    return { received: true, message: "Unsupported Event" };
  }

  if (eventType === "checkout.session.completed") {
    await handleCheckoutCompleted(data, stripe);
  }

  if (eventType === "invoice.paid") {
    await handleInvoicePaid(data, stripe);
  }
  if (eventType === "invoice.payment_failed") {
    await handleInvoiceFailed(data);
  }

  // Add more event types here if needed

  return { received: true };
}



export type CheckoutSessionCompletedData = Extract<
  Stripe.Event,
  { type: "checkout.session.completed" }
>["data"]["object"];

export type InvoicePaidData = Extract<
  Stripe.Event,
  { type: "invoice.paid" }
>["data"]["object"];

export type InvoicePaymentFailedData = Extract<
  Stripe.Event,
  { type: "invoice.payment_failed" }
>["data"]["object"];
