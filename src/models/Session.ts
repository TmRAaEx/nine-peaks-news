import mongoose, { Document, Model, Schema } from "mongoose";

export interface ISession extends Document {
  user_id: mongoose.Types.ObjectId;
  sessionToken: string;
  expiresAt: Date;
}

const SessionSchema = new Schema<ISession>(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    sessionToken: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const Session: Model<ISession> =
  mongoose.models.Session || mongoose.model<ISession>("Session", SessionSchema);

export default Session;
