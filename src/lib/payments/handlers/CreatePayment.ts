
import Payment from "@/models/Payment";
import connectDB from "../../ConnectDB";
import { ITier } from "@/models/Tier";
import { IUser } from "@/models/User";

export default async function CreatePayment(
  user_id: IUser["_id"],
  tier_id: ITier["_id"] = "Basecamp"
) {
  await connectDB();

  const isFree = tier_id === "Basecamp";

  const now = new Date();
  const oneWeekFromNow = new Date();
  oneWeekFromNow.setDate(now.getDate() + 7);


  const forever = new Date(8640000000000000);

  const paymentData = {
    user_id,
    tier_id,
    payment_date: now,
    due_date: isFree ? forever : oneWeekFromNow,
    status: isFree ? "free" : "pending",
    stripe_ref: null,
  };

  const newPayment = await Payment.create(paymentData);

  return newPayment; 
}
