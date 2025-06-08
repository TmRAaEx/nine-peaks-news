"use client";
import React, { useEffect, useState } from "react";
import SubscriptionTier from "./SubscriptionTier";
import { ITierData } from "@/interfaces/ITierData";
import apiClient, { paymentClient } from "@/lib/ApiClient";
import { useRouter } from "next/navigation";
import { CreatePaymentResponse } from "@/interfaces/api/responses";

export default function SubscriptionList({ tiers }: { tiers: ITierData[] }) {
  const [selected, setSelected] = useState<string>("Basecamp");
  const [loading, setLoading] = useState<boolean>(false);
  const [userId, setUserid] = useState("");

  const router = useRouter();
  const onSelect = (tier: string) => {
    setSelected(tier);
  };

  const handleContinue = async () => {
    setLoading(true);
    const url =
      selected != "Basecamp"
        ? `/checkout?price_id=${getPriceId()}&tier_id=${selected}`
        : "/";

    const apiData = { user_id: userId, tier_id: selected };

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

  useEffect(() => {
    const fetchSession = async () => {
      //TODO remove any
      const { session, tier } = await apiClient.get<any>("/session-info");

      console.log("session", session);

      setUserid(session.user_id);
    };
    fetchSession();
  }, []);

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
          {loading ? "Loading..." : "Continue with" + selected}
        </button>
      </section>
    </>
  );
}
