import mongoose, { Document, Model, Schema } from 'mongoose';
import { IUser } from './User';

export interface IArticle extends Document {
  title: string;
  heroImg: string;
  description: string;
  imgs?: string[];
  content: string;
  user_id: mongoose.Types.ObjectId | IUser;
  date: Date;
  tier: string;
}

const ArticleSchema = new Schema<IArticle>(
  {
    title: { type: String, required: true },
    heroImg: { type: String, required: true },
    description: { type: String, required: true },
    imgs: { type: [String], required: false },
    content: { type: String, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    tier: { type: String, required: true },
  },
  { timestamps: true }
);

const Article: Model<IArticle> =
  mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema);

export default Article;
