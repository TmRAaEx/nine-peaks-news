import { error } from "console";
import connectDB from "./ConnectDB";
import User, { IUser } from "@/models/User";
import Article, { IArticle } from "@/models/Article";
import IShowManyArticles from "@/interfaces/IShowManyArticles";
import { HydratedDocument, Types } from "mongoose";
import PasswordResetToken from "@/models/PasswordResetToken";
import crypto from 'crypto';

type IUserApiData = {
  userName: IUser["userName"];
  email: IUser["email"];
  password: IUser["password"];
};
//TODO Refactor to Partial<IUser>
export async function RegisterUser(data: IUserApiData): Promise<IUser | any> {
  try {
    await connectDB();

    const isUser = await User.findOne({ email: data.email });

    if (isUser) {
      return { error: "User exist" };
    }

    const createdUser = await User.create(data);
    return createdUser;
    
  } catch (err) {
    console.error("[LIB Authentication Register]", err);
    return { error: err };
  }
}

type IUserLoginData = {
  email: IUser["email"];
  password: IUser["password"];
  
};

interface ISignedInUser {
  _id: string;
  email: string;
  userName: string;
}

// type ISignedInUser = Pick<IUser, 'email' | 'userName'> & { _id: string };

export async function SignUserIn(data: IUserLoginData): Promise<{ user: ISignedInUser } | { error: string }> {
  try {
    await connectDB();

    const user = await User.findOne({ email: data.email }).select('+password');
    if (!user) {
      return { error: "User not found" };
    }

    const isMatch = await user.comparePassword(data.password);
    if (!isMatch) {
      return { error: "Invalid password" };
    }

    return { 
      user: {
        _id: user._id.toString(),
        email: user.email,
        userName: user.userName,
      } 
    };
  } catch (err) {
    console.error("Error signing in", err);
    return { error: "Internal server error" };
  }
}


type ICreateArticleData = {
  title: IArticle["title"];
  description: IArticle["description"];
  header_img: IArticle["header_img"];
  images: IArticle["images"]; 
  content: IArticle["content"];
  sub_titles: IArticle["sub_titles"]; 
  sub_content: IArticle["sub_content"]; 
  required_tier: IArticle["required_tier"]; 
  authur: IArticle["authur"]; 
  date: IArticle ["date"];

};

export async function CreateArticle(data: ICreateArticleData): Promise<IArticle | any> {
  try {
    await connectDB();

    const createdArticle = await Article.create(data);
    return createdArticle;
    
  } catch (err) {
    console.error("[LIB Authentication Create-Article]", err);
    return { error: err };
  }
}

export async function ShowAllArticles(data: any = {}) {
  try {
  await connectDB();
  return await Article.find(data);

} catch (err) {
  console.error("[LIB Authentication Articles]", err);
  return { error: err };
}
}

export async function ShowOneArticle(id: string) {
  try {
    await connectDB();
    return await Article.findById(id);
  } catch (err) {
    console.error("[LIB Authentication Articles]", err);
    return { error: err };
  }
}

export async function generatePasswordResetToken(userId: Types.ObjectId): Promise<string> {
  const rawToken = crypto.randomBytes(32).toString('hex');
  const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');

  await PasswordResetToken.deleteMany({ userId });

  await PasswordResetToken.create({
      userId,
      tokenHash,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60), 
  });

  return rawToken;
}

export async function resetPassword(userId: string, token: string, newPassword: string): Promise<boolean> {
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');

  const record = await PasswordResetToken.findOne({
      userId,
      tokenHash,
      expiresAt: { $gt: new Date() },
  });

  if (!record) throw new Error('Invalid or expired token');

  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  user.password = newPassword;
  await user.save();
  await PasswordResetToken.deleteMany({ userId }); 

  return true;
}