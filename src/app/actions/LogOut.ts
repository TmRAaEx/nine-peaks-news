"use server";

import connectDB from "@/lib/ConnectDB";
import { destroySession } from "@/lib/Session";
import Session from "@/models/Session";
import { IUser } from "@/models/User";

export async function logOut() {
  "use server";
  await destroySession();
}

export async function logOutAll(user_id: IUser["id"]) {
  "use server";

  await connectDB();
  await Session.deleteMany({ user_id });

  await destroySession();
}
