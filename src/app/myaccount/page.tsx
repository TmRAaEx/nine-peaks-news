import SessionControls from "@/components/LogOutButtons";
import getUserData from "@/lib/UserData";
import { redirect } from "next/navigation";

export default async function Profile() {
  const userData = await getUserData();

  if (!userData) {
    redirect("/authentication/login");
  }

  const { user, tier, sessions } = userData;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8 mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Welcome, {user.userName}
      </h1>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        <div className="bg-brown3 text-blue1 p-6 rounded-2xl shadow-inner">
          <h2 className="text-xl font-semibold mb-2">Membership Tier</h2>
          <p className="text-lg">{tier}</p>
        </div>

        <div className="bg-gray-100 p-6 rounded-2xl border border-gray-300">
          <h2 className="text-xl font-semibold mb-2">Account Info</h2>
          <p>
            <span className="font-medium">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-medium">Username:</span> {user.userName}
          </p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">
          Active Sessions
        </h2>
        <ul className="space-y-3">
          {sessions.map((session) => (
            <li
              key={session.sessionToken}
              className="bg-white border border-gray-200 rounded-lg p-4 text-sm text-gray-700 shadow-sm overflow-x-auto"
            >
              <span className="font-mono">{session.sessionToken}</span>
              <div className="text-xs text-gray-500 mt-1">
                Expires: {new Date(session.expiresAt).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
        <SessionControls user_id={user.id} />
      </div>
    </div>
  );
}
