import { IArticle } from "@/models/Article";
import { IPayment } from "@/models/Payment";

// Base interface
interface BasePaymentResponse {
  success: boolean;
}

// Success response
export interface CreatePaymentSuccessResponse extends BasePaymentResponse {
  success: true;
  payment: IPayment;
}

// Error response
export interface CreatePaymentErrorResponse extends BasePaymentResponse {
  success: false;
  error: string;
}

// Union type (optional, for convenience)
export type CreatePaymentResponse =
  | CreatePaymentSuccessResponse
  | CreatePaymentErrorResponse;


import { IUser } from "@/models/User";

export interface IRegisterApiResponse {
  error?: string;
  data: IUser;
}


export interface ICreateArticleResponse{
  data: IArticle,
  error?: string
}
