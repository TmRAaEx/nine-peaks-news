import Payment, { IPayment } from "@/models/Payment";
import connectDB from "../ConnectDB";
import UpdatablePaymentData from "@/interfaces/UpdatabelPaymentData";


export default async function updatePayment(
  payment_id: IPayment["_id"],
  data: UpdatablePaymentData
) {
  try {
    await connectDB();

    const current = await Payment.findById(payment_id);
    const updatedPayment = await current?.updateOne(data);

    return updatedPayment;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    console.error("[UpdatePayment]:error updating payment ", message);
    throw new Error(message);
  }
}
