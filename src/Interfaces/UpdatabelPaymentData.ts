import { IPayment } from "@/models/Payment";
export default interface UpdatablePaymentData {
  payment_date: IPayment["payment_date"];
  due_date: IPayment["due_date"];
  status: IPayment["status"];
  stripe_ref: IPayment["stripe_ref"];
}
