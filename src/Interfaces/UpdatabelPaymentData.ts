import { IPayment, PaymentObject } from "@/models/Payment";
export default interface UpdatablePaymentData {
  payment_date: IPayment["payment_date"];
  due_date?: IPayment["due_date"];
  status: IPayment["status"];
  payments: PaymentObject[];
  stripe_ref: IPayment["stripe_ref"];
}
