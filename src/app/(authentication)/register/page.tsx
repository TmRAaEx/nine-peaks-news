"use client";

import { useActionState } from "react";
import Link from "next/link";
import RegisterAction from "../../actions/authentication/register";
import SecondaryButton from "@/components/shared/buttons/Secondarybutton";

const initialState = {
  errors: {},
  message: "",
};

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(
    RegisterAction,
    initialState
  );

  return (
    <form action={formAction} className="form space-y-4">
      {state?.error && <p className="text-red-500">{state.error}</p>}

      <h1 className="text-4xl">Sign up</h1>

      {/* Username */}
      <label htmlFor="userName" className="label">
        Username
      </label>
      <input name="userName" id="userName" className="input" required />
      {state?.errors?.userName && (
        <p className="text-red-500">{state.errors.userName.join(", ")}</p>
      )}

      {/* Email */}
      <label htmlFor="email" className="label">
        Email
      </label>
      <input type="email" name="email" id="email" className="input" required />
      {state?.errors?.email && (
        <p className="text-red-500">{state.errors.email.join(", ")}</p>
      )}

      {/* Password */}
      <label htmlFor="password" className="label">
        Password &#40;minimum 8 characters&#41;
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

      {/* Confirm Password */}
      <label htmlFor="confirm_password" className="label">
        Confirm Password
      </label>
      <input
        type="password"
        name="confirm_password"
        id="confirm_password"
        className="input"
        required
      />
      {state?.errors?.confirm_password && (
        <p className="text-red-500">
          {state.errors.confirm_password.join(", ")}
        </p>
      )}

      {/* GDPR Consent */}
      <div className="text-center space-y-2">
        <label className="inline-flex items-start gap-2 text-sm md:text-base font-medium">
          <input
            type="checkbox"
            name="gdpr_consent"
            value="on"
            className="mt-1 accent-blue-600 w-4 h-4"
            required
          />
          <span>
            I consent to the processing of my data in accordance with the
            <br className="hidden sm:block" />
            <Link
              href="/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline font-medium"
            >
              GDPR Privacy Policy
            </Link>
          </span>
        </label>
        {state?.errors?.gdpr_consent && (
          <p className="text-red-500">{state.errors.gdpr_consent.join(", ")}</p>
        )}
      </div>

      <SecondaryButton disabled={isPending}>
        {isPending ? "Registering..." : "Register"}
      </SecondaryButton>

      <p>
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-blue-600 hover:underline font-medium"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
