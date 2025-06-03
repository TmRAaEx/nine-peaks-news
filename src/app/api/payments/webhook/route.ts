import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/ConnectDB";
import Stripe from "stripe";
import Payment, { IPayment } from "@/models/Payment";
import { headers } from "next/headers";
import { stripe } from "@/lib/payments/Stripe";
import CreatePayment from "@/lib/payments/CreatePayment";
import updatedPayment from "@/lib/payments/UpdatePayment";
import updatePayment from "@/lib/payments/UpdatePayment";
import UpdatablePaymentData from "@/interfaces/UpdatabelPaymentData";

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature")!;

  let data;
  let event: Stripe.Event;
  let eventType;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unexpected error!";
    console.error("[stripe webhook]: Signuature verification failed.", message);

    return NextResponse.json({ error: message }, { status: 400 });
  }

  data = event.data;
  eventType = event.type;

  try {
    const session_id = (data.object as Stripe.Checkout.Session).id;
    switch (eventType) {
      case "checkout.session.completed":
        const session = await stripe.checkout.sessions.retrieve(session_id, {
          expand: ["line_items"],
        });

        const { user_id, tier_id } = session.metadata!;

        if (!user_id || !tier_id) {
          break;
        }

        const isPayment = await Payment.findOne({
          user_id: user_id,
          tier_id: tier_id,
        });

        let createdPayment;
        if (!isPayment) {
          createdPayment = await CreatePayment(user_id, tier_id);
          console.log(createdPayment);
        }
        const now = new Date();
        const oneWeekFromNow = new Date();
        oneWeekFromNow.setDate(now.getDate() + 7);
        const payment_data: UpdatablePaymentData = {
          payment_date: now,
          due_date: oneWeekFromNow,
          status: "paid",
          stripe_ref: session_id,
        };
        
        const payment_id = isPayment ? isPayment.id : createdPayment!.id;
        await updatePayment(payment_id, payment_data);

        break;

      default:
        return NextResponse.json("Unsupported event");
    }
  } catch {}

  return NextResponse.json({});
}
