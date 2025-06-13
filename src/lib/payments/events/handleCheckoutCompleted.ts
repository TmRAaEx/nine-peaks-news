import UpdatablePaymentData from "@/interfaces/UpdatabelPaymentData";
import Payment from "@/models/Payment";
import Stripe from "stripe";
import CreatePayment from "../handlers/CreatePayment";
import updatePayment from "../handlers/UpdatePayment";

export default async function handleCheckoutCompleted(
  data: any,
  stripe: Stripe
) {
  const session_id = (data.object as Stripe.Checkout.Session).id;
  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items"],
  });

  const { user_id, tier_id } = session.metadata ?? {};
  if (!user_id || !tier_id) {
    console.warn(
      "[Webhook event] Missing user_id or tier_id in session metadata."
    );
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

  if (session.subscription) {
    await stripe.subscriptions.update(session.subscription as string, {
      metadata: {
        db_payment_id: existingPayment?.id ?? createdPayment?.id,
      },
    });
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

  const payment_id = existingPayment ? existingPayment.id : createdPayment!.id;

  await updatePayment(payment_id, paymentData);
}
