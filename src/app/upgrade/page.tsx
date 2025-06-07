import React from "react";
import SubscriptionList from "@/components/Subscriptions/SubscriptionList";
import GetTiers from "@/lib/Tiers";
import { getSessionData } from "@/lib/session/Session";
import { redirect } from "next/navigation";
export default async function Upgrade() {
  const tiers = await GetTiers();
  const sessionData = await getSessionData();

  if (!sessionData) {
    redirect("/login");
  }

  return <SubscriptionList tiers={tiers} />;
}
