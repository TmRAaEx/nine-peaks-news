"use client";

import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import useSession from "@/hooks/useSession";
import SecondaryButton from "@/components/shared/buttons/Secondarybutton";
import LoginAction from "../../actions/authentication/login";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(LoginAction, undefined);
  const { session, loading } = useSession();
  const router = useRouter();

  useEffect(() => {
    //redirect if already logged in
    if (session && !loading) {
      router.push("/myaccount");
    }
  }, [session, loading, router]);

  useEffect(() => {
    if (state && !state.error && !state.errors) {
      // Successful login, no errors
      router.push("/myaccount");
    }
  }, [state, router]);

  return (
    <form action={formAction} className="form">
      <h1 className="text-4xl">Sign In</h1>
      {state?.error && (
        <p className="text-red-500 font-medium">{state.error}</p>
      )}

      <label htmlFor="email" className="label">
        Email
      </label>
      <input type="email" name="email" id="email" className="input" required />
      {state?.errors?.email && (
        <p className="text-red-500">{state.errors.email.join(", ")}</p>
      )}

      <label htmlFor="password" className="label">
        Password
      </label>
      <input
        type="password"
        name="password"
        id="password"
        className="input"
        required
      />
      {state?.errors?.password && (
        <p className="text-red-500">{state.errors.password.join(", ")}</p>
      )}

      <SecondaryButton disabled={pending}>
        {pending ? "Signing in..." : "Sign in"}
      </SecondaryButton>
    </form>
  );
}
