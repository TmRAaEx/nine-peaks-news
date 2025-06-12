// models/Tier.ts
import mongoose, { Document, Model, Schema } from "mongoose";

export interface ITier extends Document {
  _id: string; // Custom string ID
  price?: number;
  stripe_id: string;
  name?: string;
  benefits: string[];
}

const TierSchema = new Schema<ITier>(
  {
    _id: { type: String, required: true },
    price: { type: Number, required: false },
    stripe_id: { type: String, required: true },
    benefits: { type: [String], required: false }
  },
  { timestamps: true, collection: "tiers" }
);



export interface IPieProps {
  tiers: any[];
}

const Tier: Model<ITier> =
  mongoose.models.Tier || mongoose.model<ITier>("Tier", TierSchema);

export default Tier;
