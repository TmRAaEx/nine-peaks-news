import { IPayment } from "@/models/Payment";

export type CreatePaymentResponse =
  | {
      success: true;
      payment: IPayment;
    }
  | {
      success: false;
      error: string;
    };
