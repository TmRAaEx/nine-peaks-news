"use client";

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { fetchClientSecret } from "../actions/ClientSecret";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import useSession from "@/hooks/useSession";

const public_key = process.env.NEXT_PUBLIC_STRIPE_PK;

if (!public_key) {
  throw new Error("[Checkout]: NEXT_PUBLIC_STRIPE_PK not set in environment");
}

const stripePromise = loadStripe(public_key);

export default function Checkout() {
  const { session, loading } = useSession();

  const searchParams = useSearchParams();
  const price_id: string = searchParams.get("price_id")!;
  //TODO refactor into session instead of hard coded
  const tier_id = searchParams.get("tier_id")!;
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    console.log("session", session);
    
    const getClientSecret = async () => {
      try {
        const secret = await fetchClientSecret(
          price_id,
          session.session.user_id,
          tier_id
        );
        setClientSecret(secret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
      }
    };

    getClientSecret();
  }, [price_id, session]);

  if (!clientSecret) {
    return <div>Loading...</div>;
  }

  return (
    <div id="checkout" className="w-full max-w-[1200px] mx-auto">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={{
          clientSecret,
        }}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
}
