import { ITierData } from "@/interfaces/ITierData";
import Image from "next/image";
import SecondaryButton from "@/buttons/Secondarybutton";
import Link from "next/link";

export default function SubscriptionTier({ tier }: { tier: ITierData }) {
  const tierDescriptions: Record<string, string> = {
    Basecamp: "Base tier: get access to basic articles",
    "Summit Seeker": "Middle tier: get access to more premium articles",
    "Peak Elite": "Top tier: get access to all premium articles",
  };

  return (
    <li className="flex flex-col justify-between items-center text-center gap-3">
      <h1 className="font-bold text-xl">{tier.name}</h1>
      <Image src={tier.image} alt={tier._id} width={300} height={300} />
      <p>{tierDescriptions[tier.name]}</p>
      <Link href={`/checkout?${tier._id}`} className="w-full">
        <SecondaryButton>
          {tier.price != "0" ? "$" + tier.price : "Free"}
        </SecondaryButton>
      </Link>
    </li>
  );
}
