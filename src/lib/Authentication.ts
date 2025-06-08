import connectDB from "./ConnectDB";
import User, { IUser } from "@/models/User";
import { Types } from "mongoose";
import PasswordResetToken from "@/models/PasswordResetToken";
import crypto from "crypto";

type IUserApiData = {
  userName: IUser["userName"];
  email: IUser["email"];
  password: IUser["password"];
};

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
    const message = err instanceof Error ? err.message : "unexpected error";
    return { error: message };
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

export async function SignUserIn(
  data: IUserLoginData
): Promise<{ user: ISignedInUser } | { error: string }> {
  try {
    await connectDB();

    const user = await User.findOne({ email: data.email }).select("+password");
    if (!user) {
      return { error: "No user with that email" };
    }

    const isMatch = await user.comparePassword(data.password);
    if (!isMatch) {
      return { error: "Invalid Credentials" };
    }

    return {
      user: {
        _id: user._id.toString(),
        email: user.email,
        userName: user.userName,
      },
    };
  } catch (err) {
    console.error("Error signing in", err);
    return { error: "Internal server error" };
  }
}

export async function generatePasswordResetToken(
  userId: Types.ObjectId
): Promise<string> {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");

  await PasswordResetToken.deleteMany({ userId });

  await PasswordResetToken.create({
    userId,
    tokenHash,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60),
  });

  return rawToken;
}

export async function resetPassword(
  userId: string,
  token: string,
  newPassword: string
): Promise<boolean> {
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

  const record = await PasswordResetToken.findOne({
    userId,
    tokenHash,
    expiresAt: { $gt: new Date() },
  });

  if (!record) throw new Error("Invalid or expired token");
  if (!record) throw new Error("Invalid or expired token");

  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  if (!user) throw new Error("User not found");

  user.password = newPassword;
  await user.save();
  await PasswordResetToken.deleteMany({ userId });
  await PasswordResetToken.deleteMany({ userId });

  return true;
}
