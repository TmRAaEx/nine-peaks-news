// lib/payments/handleStripeWebhook.ts

import Stripe from "stripe";
import { stripe } from "./Stripe";
import CreatePayment from "./CreatePayment";
import updatePayment from "./UpdatePayment";
import Payment from "@/models/Payment";
import UpdatablePaymentData from "@/interfaces/UpdatabelPaymentData";

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

  const allowedEvents: string[] = ["checkout.session.completed"];

  const isAllowed = allowedEvents.includes(eventType);
  if (!isAllowed) {
    return { received: true, message: "Unsupported Event" };
  }

  if (eventType === "checkout.session.completed") {
    const session_id = (data.object as Stripe.Checkout.Session).id;
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items"],
    });

    const { user_id, tier_id } = session.metadata ?? {};
    if (!user_id || !tier_id) {
      console.warn("Missing user_id or tier_id in session metadata.");
      return;
    }

    const existingPayment = await Payment.findOne({
      user_id,
      tier_id,
    });

    let createdPayment;
    if (!existingPayment) {
      createdPayment = await CreatePayment(user_id, tier_id);
    }

    const now = new Date();
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(now.getDate() + 7);

    const paymentData: UpdatablePaymentData = {
      payment_date: now,
      due_date: oneWeekFromNow,
      status: "paid",
      stripe_ref: session_id,
    };

    const payment_id = existingPayment
      ? existingPayment.id
      : createdPayment!.id;

    await updatePayment(payment_id, paymentData);
  }

  // Add more event types here if needed

  return { received: true };
}
