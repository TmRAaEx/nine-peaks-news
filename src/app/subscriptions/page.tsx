import SubscriptionTier from "@/components/Subscriptions/SubscriptionTier";
import GetTiers from "@/lib/tiers";

export default async function Subscriptions() {
  const tiers = await GetTiers();
  const subscriptions = tiers.filter((tier) => tier.name != "Admin");
  return (
    <>
      <ul className="w-120 grid grid-cols-3 gap-6">      
        {subscriptions.map((subscription) => (
          <SubscriptionTier key={subscription._id} tier={subscription} />
        ))}
      </ul>
    </>
  );
}
