// models/Tier.ts
import mongoose, { Document, Model, Schema } from "mongoose";

export interface ITier extends Document {
  _id: string; // Custom string ID
  price?: number;
  stripe_id: string;
  name?: string;
}

const TierSchema = new Schema<ITier>(
  {
    _id: { type: String, required: true }, // ✅ must define _id explicitly
    price: { type: Number, required: false },
    stripe_id: { type: String, required: true },
  },
  { timestamps: true, collection: "tiers" }
);

const Tier: Model<ITier> =
  mongoose.models.Tier || mongoose.model<ITier>("Tier", TierSchema);

export default Tier;
