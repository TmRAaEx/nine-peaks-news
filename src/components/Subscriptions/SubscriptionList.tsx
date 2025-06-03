"use client";
import React, { useState } from "react";
import SubscriptionTier from "./SubscriptionTier";
import { ITierData } from "@/interfaces/ITierData";
import Link from "next/link";
import { paymentClient } from "@/lib/ApiClient";
import { CreatePaymentResponse } from "@/types/ApiResponses";
import { useRouter } from "next/navigation";

export default function SubscriptionList({ tiers }: { tiers: ITierData[] }) {
  const [selected, setSelected] = useState<string>("Basecamp");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const onSelect = (tier: string) => {
    setSelected(tier);
  };

  const handleContinue = async () => {
    setLoading(true);
    const url =
      selected != "Basecamp"
        ? `/checkout?price_id=${getPriceId()}?tier_id=${selected}`
        : "/";

    const apiData = { user_id: "683da71b871ee965b541bf5b", tier_id: selected };

    const response = await paymentClient.post<CreatePaymentResponse>(
      "/create-payment",
      apiData
    );

    if (response.success) {
      setLoading(false);
      router.push(url);
      return;
    }

    setLoading(false);
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
        <button
          onClick={handleContinue}
          className="text-blue1 hover:text-blue3 cursor-pointer text-lg font-semibold"
        >
          Continue with {selected}
        </button>
      </section>
    </>
  );
}
