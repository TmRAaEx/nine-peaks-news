import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IArticle extends Document {
  title: string;
  description: string;
  header_img: string;
  content: string;
  sub_titles: string[];
  sub_images: string[];
  sub_content: string[];
  required_tier: string;
  date: Date;
  authur: string;
 
}

const ArticleSchema = new Schema<IArticle>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    header_img: { type: String, required: true },
    content: { type: String, required: true },
    sub_titles:{ type: [String], required: false },
    sub_images: { type: [String], required: false },
    sub_content: { type: [String], required: false },
    required_tier: { type: String, required: true },
    date: { type: Date, required: true }, 
    authur: { type: String, required: true },
  },
  { timestamps: true }
);

const Article: Model<IArticle> =
  mongoose.models.Article || mongoose.model<IArticle>('Article', ArticleSchema);

export default Article;
