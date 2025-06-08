import React from "react";
import GetTiers from "@/lib/Tiers";
import SubscriptionList from "@/components/Subscriptions/SubscriptionList";
export default async function Upgrade() {
  const tiers = await GetTiers();

  return (
    <SubscriptionList tiers={tiers}/>
  );
}
