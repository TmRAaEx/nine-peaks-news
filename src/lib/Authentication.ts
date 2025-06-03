import { error } from "console";
import connectDB from "./ConnectDB";
import User, { IUser } from "@/models/User";

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

export async function SignUserIn(data: IUserLoginData): Promise<IUser | { error: string }> {
  try {
    await connectDB();
    const user = await User.findOne({ email: data.email });
    if (!user) {
      return { error: "User not found" };
    }

    const isMatch = await user.comparePassword(data.password);
    if (!isMatch) {
      return { error: "Invalid password" };
    }

    return user;
  } catch (err) {
    console.error("Error signing in", err);
    return { error: "Internal server error" };
  }
}