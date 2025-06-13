"use client";

import SecondaryButton from "@/components/shared/buttons/Secondarybutton";
import useSession from "@/hooks/useSession";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import Link from "next/link";
import LoginAction from "../../actions/authentication/login";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(LoginAction, undefined);
  const { session, loading } = useSession();
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (session && !loading) {
      router.push("/myaccount");
    }
  }, [session, loading, router]);

  // Redirect after successful login
  useEffect(() => {
    if (state && !state.message && !state.errors) {
      router.push("/myaccount");
    }
  }, [state, router]);

  return (
    <form action={formAction} className="form">
      <h1 className="text-4xl mb-4">Sign In</h1>

      {state?.message && (
        <p className="text-red-500 font-medium">{state.message}</p>
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

      <p className="text-center mt-4">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-blue-600 hover:underline font-medium"
        >
          Register here
        </Link>
      </p>
    </form>
  );
}
