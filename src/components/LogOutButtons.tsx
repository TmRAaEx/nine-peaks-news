"use client";

import { logOut, logOutAll } from "@/actions/LogOut";

import { IUser } from "@/models/User";
import { useRouter } from "next/navigation";

export default function SessionControls({ user_id }: { user_id: IUser["id"] }) {
  const router = useRouter();

  const handleLogout = async () => {
    await logOut();
    router.refresh();
  };

  const handleLogoutAll = async () => {
    await logOutAll(user_id);
    router.refresh();
  };

  return (
    <div className="mt-6 flex gap-4">
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 cursor-pointer"
      >
        Log out
      </button>
      <button
        onClick={handleLogoutAll}
        className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 cursor-pointer"
      >
        Log out all
      </button>
    </div>
  );
}
