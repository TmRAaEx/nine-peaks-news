import mongoose, {Document, Model, Schema} from 'mongoose';
import { IUser } from './User';
import { ITier } from './Tier';

export interface IPayment extends Document {    
    user_id: mongoose.Types.ObjectId | IUser;
    tier_id: mongoose.Types.ObjectId | ITier;
    payment_date: Date;
    due_date: Date;
    status?: number;
    stripe_ref: string;
}

const PaymentSchema = new Schema<IPayment>({
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tier_id: { type: Schema.Types.ObjectId, ref: 'Tier', required: true },
    payment_date: {type: Date, required: true},
    due_date: {type: Date, required: true},
    status: { type: Number, required: false },
    stripe_ref: {type: String, required: true }
},
  { timestamps: true } 
);

const Payment: Model<IPayment> =
  mongoose.models.Payment || mongoose.model<IPayment>('Payment', PaymentSchema);

export default Payment; 