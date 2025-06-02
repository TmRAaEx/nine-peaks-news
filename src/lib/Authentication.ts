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

export async function SignUserIn(data: IUserLoginData): Promise<IUser|any >{
  try {
    await connectDB();
    const loginUser = await User.findOne({email: data.email, password: data.password});
    return loginUser;
  }catch (err) {
    console.error("Error soigning in", err);
    return {error:err};
  }
}
