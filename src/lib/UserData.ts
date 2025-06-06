import User, { IUser } from "@/models/User";
import { getSessionData, getUserSessions } from "./Session";
import { ISession } from "@/models/Session";

export default async function getUserData(): Promise<{
  user: IUser;
  tier: string;
  sessions: ISession[];
} | void> {
  const sessionData = await getSessionData();

  if (!sessionData) {
    return;
  }

  const { session, tier } = sessionData;

  const user = await User.findById(session.user_id);
  if (!user) {
    return;
  }
  const sessions = await getUserSessions(user?.id);

  return { user, tier, sessions };
}
