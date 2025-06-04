import mongoose, { Document, Model, Schema } from "mongoose";
import { IUser } from "./User";

export interface PaymentObject {
  payment_date: Date;
  due_date: Date;
}

export interface IPayment extends Document {
  user_id: mongoose.Types.ObjectId | IUser;
  tier_id: string;
  payment_date: Date;
  due_date: Date;
  payments: PaymentObject[];
  status: "paid" | "pending" | "failed" | "free";
  stripe_ref?: string | null;
}

// 🔧 Mongoose subschema for payments-array
const PaymentObjectSchema = new Schema<PaymentObject>(
  {
    payment_date: { type: Date, required: true },
    due_date: { type: Date, required: true },
  },
  { _id: false }
);

const PaymentSchema = new Schema<IPayment>(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tier_id: { type: String, ref: "Tier", required: true },
    payment_date: { type: Date, required: true },
    due_date: { type: Date, required: true },
    status: {
      type: String,
      enum: ["paid", "pending", "failed", "free"],
      required: true,
      default: "free",
    },
    payments: { type: [PaymentObjectSchema], required: true },
    stripe_ref: { type: String, required: false, default: null },
  },
  { timestamps: true }
);

const Payment: Model<IPayment> =
  mongoose.models.Payment || mongoose.model<IPayment>("Payment", PaymentSchema);

export default Payment;
