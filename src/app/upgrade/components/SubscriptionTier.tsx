import { ITierData } from "@/interfaces/ITierData";
import Image from "next/image";
import SecondaryButton from "@/buttons/Secondarybutton";

export default function SubscriptionTier({
  tier,
  onSelect,
  selected,
}: {
  tier: ITierData;
  onSelect: (tier: string) => void;
  selected: string;
}) {
  // const tierData: Record<string, any> = {
  //   Basecamp: {
  //     // nocard: "No credit card required.",
  //     benefits: ["Mark articles as favorites", "Add reviews to articles"],
  //   },
  //   "Summit Seeker": {
  //     benefits: [
  //       "Access to some premium articles",
  //       "Early access to new content",
  //     ],
  //   },
  //   "Peak Elite": {
  //     benefits: [
  //       "Unlimited access to all content",
  //       "Exclusive monthly Q&A sessions",
  //     ],
  //   },
  // };

  console.log(tier);

  return (
    <li className="flex flex-col justify-between items-center text-center gap-3 border border-blue3 p-6 w-4/5 max-w-[300px] rounded-4xl dark:text-white">
      <div className="flex flex-col items-center">
        <Image src={tier.image} alt={tier._id} width={50} height={50} />
        <h1 className="font-semibold text-blue2 text-lg tracking-widest uppercase ">
          {tier.name}
        </h1>
      </div>
      {/* {tierData[tier.name].nocard ? (
        <p className="text-brown2 text-md/8 font-semibold">
          {tierData[tier.name].nocard}
        </p>
      ) : (
        <p className="text-brown2 text-md/8 font-semibold">Weekly billing</p>
      )} */}
      <h2 className="mt-2 text-4xl text-blue1 font-title font-semibold dark:text-white">
        {tier.price != "0" ? "$" + tier.price : "Free"}
      </h2>
      <h3 className="mt-2 text-2xl text-blue1 font-serif font-semibold dark:text-white ">
        Benefits
      </h3>
      <ul className="flex flex-col items-start gap-3 list-disc">
        {tier.benefits?.map((benefit: string) => (
          <li key={benefit} className="font-medium text-md">
            {benefit}
          </li>
        ))}
      </ul>
      {selected === tier.name ? (
        <button
          disabled
          className="duration-200 ease-in text-white w-full h-full rounded-2xl p-2 bg-gray-400 cursor-not-allowed font-semibold text-lg opacity-60"
        >
          Current
        </button>
      ) : (
        <SecondaryButton onClick={() => onSelect(tier.name)}>
          Choose
        </SecondaryButton>
      )}
    </li>
  );
}
