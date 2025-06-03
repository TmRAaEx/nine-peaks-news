"use client";
import React, { useState } from "react";
import SubscriptionTier from "./SubscriptionTier";
import { ITierData } from "@/interfaces/ITierData";
import Link from "next/link";

export default function SubscriptionList({ tiers }: { tiers: ITierData[] }) {
  const [selected, setSelected] = useState<string>("Basecamp");

  const onSelect = (tier: string) => {
    setSelected(tier);
  };

  const getPriceId = () => {
    let tier = tiers.find((tier) => tier.name === selected)!;

    return tier.stripe_id;
  };
  return (
    <>
      <section className="flex flex-col items-center w-full gap-6">
        <ul className="flex flex-wrap gap-6 justify-center w-full max-w-[1200px]">
          {tiers.map((tier) => (
            <SubscriptionTier
              key={tier._id}
              tier={tier}
              onSelect={onSelect}
              selected={selected}
            />
          ))}
        </ul>
        <Link href={`/checkout?price_id=${getPriceId()}`}>
          Continue with {selected}{" "}
        </Link>
      </section>
    </>
  );
}
