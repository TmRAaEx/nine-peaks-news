import React from "react";
import GetTiers from "@/lib/tiers";
import SubscriptionList from "@/components/Subscriptions/SubscriptionList";
export default async function Upgrade() {
  const tiers = await GetTiers();

  return (
    <SubscriptionList tiers={tiers}/>
  );
}
