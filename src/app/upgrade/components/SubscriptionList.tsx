"use client";
import React, { useEffect, useState } from "react";
import SubscriptionTier from "./SubscriptionTier";
import { ITierData } from "@/interfaces/ITierData";
import apiClient, { paymentClient } from "@/lib/ApiClient";
import { useRouter } from "next/navigation";
import { CreatePaymentResponse } from "@/interfaces/api/responses";
import { useSearchParams } from "next/navigation";
import { ISession } from "@/models/Session";
import { IUser } from "@/models/User";

export default function SubscriptionList({ tiers }: { tiers: ITierData[] }) {
  const [selected, setSelected] = useState<string>("Basecamp");
  const [loading, setLoading] = useState<boolean>(false);
  const [userId, setUserid] = useState<IUser["_id"] | null>(null);

  const searchParams = useSearchParams();

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
    const tier = tiers.find((tier) => tier.name === selected)!;

    return tier.stripe_id;
  };

  useEffect(() => {
    const tier = searchParams.get("tier") ?? "Basecamp";
    setSelected(tier);
  }, [searchParams.toString()]);

  useEffect(() => {
    const fetchSession = async () => {
      //TODO remove any
      const { sessionData } = await apiClient.get<{
        sessionData: { session: ISession; tier: string };
      }>("/session-info");

      if (!sessionData) {
        router.push("/login");
      }
      const { session } = sessionData;

      setUserid(session.user_id);
    };
    fetchSession();
  }, []);

  return (
    <>
      <section className="flex flex-col items-center w-full gap-6">
        <ul className="flex flex-wrap gap-6 justify-center w-full max-w-[1200px]">
          {tiers.map((tier, index) => (
            <SubscriptionTier
              key={tier._id + index}
              tier={tier}
              onSelect={onSelect}
              selected={selected}
            />
          ))}
        </ul>
        <button
          onClick={handleContinue}
          className="text-blue1 hover:text-blue3 cursor-pointer text-lg font-semibold dark:text-gray-200"
        >
          {loading ? "Loading..." : "Continue with" + selected}
        </button>
      </section>
    </>
  );
}
