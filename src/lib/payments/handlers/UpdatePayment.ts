import Payment, { IPayment } from "@/models/Payment";
import connectDB from "../../ConnectDB";
import UpdatablePaymentData from "@/interfaces/UpdatabelPaymentData";

export default async function updatePayment(
  payment_id: IPayment["_id"],
  data: UpdatablePaymentData
) {
  try {
    await connectDB();

    const { ...setData } = data;

    const updateOps: any = {
      $set: setData,
    };

    const updated = await Payment.findByIdAndUpdate(payment_id, updateOps, {
      new: true,
    });

    return updated;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unexpected error";
    console.error("[UpdatePayment]: Error updating payment", message);
    throw new Error(message);
  }
}
