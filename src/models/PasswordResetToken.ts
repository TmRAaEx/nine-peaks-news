import mongoose, { Schema, Types, Model } from "mongoose";

export interface IPasswordResetToken extends Document {
  userId: Types.ObjectId;
  tokenHash: string;
  expiresAt: Date;
}

const PasswordResetTokenSchema = new Schema<IPasswordResetToken>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tokenHash: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  {
    timestamps: true,
    collection: "password_reset_tokens",
  }
);

const PasswordResetToken: Model<IPasswordResetToken> =
  mongoose.models.PasswordResetToken ||
  mongoose.model<IPasswordResetToken>(
    "PasswordResetToken",
    PasswordResetTokenSchema
  );

export default PasswordResetToken;
