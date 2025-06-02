import { ITierData } from "@/interfaces/ITierData";
import Image from "next/image";
import SecondaryButton from "@/buttons/Secondarybutton";
import Link from "next/link";

export default function SubscriptionTier({ tier }: { tier: ITierData }) {
  return (
    <li className="flex flex-col justify-between text-center">
      <h1 className="font-bold text-xl">{tier.name}</h1>
      <Image src={tier.image} alt={tier._id} />
      <Link href={`/subscribe?${tier._id}`}>
        <SecondaryButton>
          {tier.price != "0" ? "$" + tier.price : "Free"}
        </SecondaryButton>
      </Link>
    </li>
  );
}
