import React from "react";
import GetTiers from "@/lib/tiers";
import SubscriptionTier from "@/components/Subscriptions/SubscriptionTier";
export default async function Upgrade() {
  const tiers = await GetTiers();

  return (
    <ul className="grid grid-cols-3 gap-6">
      {tiers.map((tier) => (
        <SubscriptionTier key={tier._id} tier={tier} />
      ))}
    </ul>
  );
}
